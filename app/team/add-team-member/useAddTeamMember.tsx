import { TeamDTO } from "@/app/account/types";
import { useAlert } from "@/common/components/molecules";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { fetcher } from "@/common/utils/network/baseFetcher";
import {
  getPricingUrl, team,
} from "@/common/utils/network/endpoints";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import useSWRMutation from 'swr/mutation';
import { addTeamMemberValidationSchema } from "./validationSchema";
import axios from "axios";
import {
  useEffect, useState,
} from "react";

const {
  addTeamMemberUrl, chooseCategoriesFE,
} = team;

export const useSubmitHandler = () => {
  const router = useRouter();
  const resolver = { resolver: yupResolver(addTeamMemberValidationSchema) };
  const [totalPrice, setTotalPrice] = useState(0);
  const [prices, setPrices] = useState<any>({});
  const [dataFields, setDataFields] = useState<any>([]);
  const [defaultValuesForForm, setDefaultValuesForForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const [nominatedMember, setNominatedMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
  })

  const {
    data: session,
  } = useSession();

  const defaultValues = {
    firstName: session?.user?.firstName || '',
    lastName: session?.user?.lastName || '',
    email: session?.user?.email || '',
    token: session?.token || '',
  };
  
  const {
    Alert, setAlertState,
  } = useAlert();

  useEffect(() => {
    axios({
      method: 'GET',
      url: getPricingUrl,
      headers: {
        Authorization: `Bearer ${defaultValues?.token}`,
      },
    }).then((res) => {
      setPrices(res.data.data[0][0].additional_info);
    })
  }, []);

  const calculatePrice = (numMembers: number) => {
    let price = 0;
    for (let i = 1; i <= numMembers; i++) {
      price += prices[i] / 100;
    }
    setTotalPrice(price);
  };

  useEffect(() => {
    if (defaultValues.token) {
      const getNominatedMember = () => {
        axios({
          method: 'GET',
          url: addTeamMemberUrl,
          headers: {
            Authorization: `Bearer ${defaultValues?.token}`,
          },
        }).then(res => {
          setNominatedMember({
            firstName: res.data.data.first_name,
            lastName: res.data.data.last_name,
            email: res.data.data.email,
          })
        })
      };
      getNominatedMember();
    }
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: addTeamMemberUrl,
      headers: {
        Authorization: `Bearer ${defaultValues?.token}`,
      },
    }).then(res => {
      let transformedData = res.data.data.members.map((item:any) => ({
        ...item,
        firstName: item.first_name,
        lastName: item.last_name,
      }));
      transformedData.forEach((item:any) => {
        delete item.first_name;
        delete item.last_name;
      });
      transformedData = transformedData.sort((a:any, b:any) => a.id - b.id);
      setDataFields(transformedData);
    });
  }, []);

  const getProblematicEmailsFromPayload = (errors:any, payload:any ) => {
    const emailErrorKeys = Object.keys(errors).filter(key => key.startsWith('members.') && key.endsWith('.email'));
    
    const problematicEmails = emailErrorKeys.map(key => {
      const indexMatch = key.match(/^members\.(\d+)\.email$/);
      if (indexMatch) {
        const index = parseInt(indexMatch[1], 10);
        return payload.members[index].email; 
      }
      return null;
    }).filter(Boolean);

    return problematicEmails;
  }

  const {
    handleSubmit,
    setValue,
    formState: { isValid },
    control,
    clearErrors,
  } = useForm<TeamDTO>({
    ...resolver,
    mode: 'onSubmit',
  });

  const addTeamMember = useSWRMutation(addTeamMemberUrl, fetcher<HeadersInit, TeamDTO>);
  
  const {
    isMutating: isLoading,
  } = addTeamMember;

  const onSubmitData: SubmitHandler<TeamDTO> = (data) => {
    const payload: TeamDTO = {
      ...data,
    };
    const emailAddresses = payload.members.map(member => member.email);
    const hasDuplicates = emailAddresses.length !== new Set(emailAddresses).size;

    if (hasDuplicates) {
      setAlertState({
        type: 'error',
        title: '',
        content: 'Please enter distinct email address for each team member',
        show: true,
      });
      return;
    }

    axios({
      method: 'POST',
      url: addTeamMemberUrl,
      headers: {
        Authorization: `Bearer ${defaultValues.token}`,
      },
      data: parseObjectPropertiesToSnakeCase(payload),
    })
      .then(() => {
        setAlertState({
          type: 'success',
          title: '',
          content: 'Added',
          show: true,
        });
        router.push(chooseCategoriesFE)
      }).catch((err: any) => {
        let errorMessage = err.response.data.message;
        const problematicEmails = getProblematicEmailsFromPayload(err.response.data.errors, payload);
    
        if (problematicEmails.length === 1) {
          errorMessage = `The following email is already been taken: ${problematicEmails.join(', ')}`;
        }

        if (problematicEmails.length > 1) {
          errorMessage = `The following emails have already been taken: ${problematicEmails.join(', ')}`;
        }

        setAlertState({
          type: 'error',
          title: '',
          content: errorMessage,
          show: true,
        });
      });
  };

  const setValues = (values: any) => {
    Object.entries(values.members[0]).forEach(([key, value]: any) => {
      key = `members.0.${key}`;
      setValue(key, value);
    });
  };

  const resetFormValues = () => {
    setDefaultValuesForForm({
      firstName: defaultValues.firstName,
      lastName: defaultValues.lastName,
      email: defaultValues.email,
    });
    setValues({
      members: [{
        firstName: defaultValues.firstName,
        lastName: defaultValues.lastName,
        email: defaultValues.email,
      }],
    });
  };

  return {
    useSubmitHandler,
    Alert,
    handleSubmit,
    isValid,
    control,
    isLoading,
    onSubmitData,
    defaultValues,
    setValue,
    nominatedMember,
    clearErrors,
    calculatePrice,
    prices,
    totalPrice,
    setTotalPrice,
    dataFields,
    resetFormValues,
    setValues,
    defaultValuesForForm,
    setDefaultValuesForForm,
  };
};
