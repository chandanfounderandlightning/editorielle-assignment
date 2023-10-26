import useSWRMutation from "swr/mutation";
import { AddTeamMemberIndividualDTO } from "@/app/account/types";
import { useAlert } from "@/common/components/molecules";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { individual } from "@/common/utils/network/endpoints";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  SubmitHandler, useForm, 
} from "react-hook-form";
import { addTeamMemberIndividualValidationSchema } from "./validationSchema";
import {
  useEffect, useState, 
} from "react";
import {
  addMemberService, getNominatedMemberService, 
} from "./services";
import {
  Field, FormData, User, 
} from "./types";

const {
  addTeamMemberUrl, chooseCategoriesFE, 
} = individual;

export const useSubmitHandler = () => {
  
  const router = useRouter();
  const resolver = {
    resolver: yupResolver(addTeamMemberIndividualValidationSchema),
  };
  const [sendToAccount, setSendToAccount] = useState(true);
  const [member, setMember] = useState<User | null>(null);

  const {
    handleSubmit, setValue, control, watch, 
  } =
    useForm<AddTeamMemberIndividualDTO>({
      ...resolver,
      mode: "onSubmit",
    });

  const allFields = watch();

  const { data: session } = useSession();

  const {
    Alert, setAlertState, 
  } = useAlert();

  const addTeamMember = useSWRMutation(
    addTeamMemberUrl,
    fetcher<HeadersInit, AddTeamMemberIndividualDTO>,
  );

  const { trigger } = addTeamMember;

  useEffect(() => {
    const getNominatedMember = (token: string) => {
      getNominatedMemberService(token).then((res) => {
        if (res?.data?.id) {
          const member = res.data;
          setMember(member);
          setSendToAccount(false);
        } else {
          setFormValues(session?.user);
          setSendToAccount(true);
        }
      });
    };
    if (session?.token) {
      getNominatedMember(session.token);
    }
  }, [session?.token]);

  useEffect(() => {
    if (member) {
      setFormValues({
        firstName: member.first_name,
        lastName: member.last_name,
        email: member.email,
      });
    }
  }, [member]);

  const setFormValues = (data: FormData = {}): void => {
    setValue("firstName", data.firstName || "");
    setValue("lastName", data.lastName || "");
    setValue("email", data.email || "");
  };

  const disableSubmit = () => {
    return !Object.values(allFields).every((field) => field);
  };

  const onSendToToggle = (value: boolean) => {
    let newValues = {};

    if (value) {
      newValues = session?.user || {};
    } else if (member) {
      newValues = {
        firstName: member.first_name,
        lastName: member.last_name,
        email: member.email,
      };
    }

    setFormValues(newValues);
    setSendToAccount(value);
  };

  const onSubmitData: SubmitHandler<AddTeamMemberIndividualDTO> = (data) => {
    const payload: AddTeamMemberIndividualDTO & { isNominated?: boolean } = {
      ...data,
      isNominated: true,
    };
    addMemberService(trigger)(
      session?.token,
      parseObjectPropertiesToSnakeCase(payload),
    )
      .then(() => {
        router.push(chooseCategoriesFE);
      })
      .catch((err: { message: string }) => {
        setAlertState({
          type: "error",
          title: "",
          content: err.message,
          show: true,
        });
      });
  };

  return {
    Alert,
    handleSubmit,
    control,
    onSubmitData,
    sendToAccount,
    disableSubmit,
    onSendToToggle,
    fields,
  };
};

const fields: Field[] = [
  {
    wrapClassName: "px-2 w-1/2 lg:w-1/5 xl:w-1/5",
    name: "firstName",
    dataCY: "first-name",
    placeholder: "First Name",
  },
  {
    wrapClassName: "px-2 w-1/2 lg:w-1/5 xl:w-1/5",
    name: "lastName",
    dataCY: "last-name",
    placeholder: "Last Name",
  },
  {
    wrapClassName: "px-2 w-full mt-4 lg:w-[30%] lg:mt-0",
    name: "email",
    dataCY: "email",
    placeholder: "Email",
  },
];
