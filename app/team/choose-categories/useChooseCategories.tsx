import {
  ChooseCategoriesDTO, ErrorModalData,
} from "@/app/account/types";
import { useAlert } from "@/common/components/molecules";
import lang from "@/common/lang";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import { fetcher } from "@/common/utils/network/baseFetcher";
import {
  team,
} from "@/common/utils/network/endpoints";
import { useSession } from "next-auth/react";
import {
  useEffect, useState,
} from "react";
import {
  SubmitHandler, useForm,
} from "react-hook-form";
import useSWRMutation from 'swr/mutation';
import {
  useRouter, useSearchParams,
} from "next/navigation";
import {
  getCategoriesService, getPricingService, getTeamDetailsService, getUserCategoriesService, 
} from "./services";

const {
  individualChooseCategories, paymentErrorModal,
} = lang;
const {
  sendCategoriesUser, chooseCategoriesFE,
} = team;


export const useChooseCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [prices, setPrices] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorModalData, setErrorModal] = useState<ErrorModalData>({
    heading: '',
    bodyText: '',
    buttonText: '',
    secondButtonText: '',
    buttonLink: null,
    secondButtonLink: null,
  });
  const [preSelectedCategories, setPreSelectedCategories] = useState<any>([]);
  const [userCount, setUserCount] = useState(0);
  const [userPrice, setUserPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const {
    Alert, setAlertState,
  } = useAlert();

  const {
    data: session, status,
  } = useSession();

  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('error')) {
      setModalOpen(true);
      setErrorModal({
        heading: paymentErrorModal.heading,
        bodyText: paymentErrorModal.bodyText,
        buttonText: paymentErrorModal.buttonText,
        secondButtonText: '',
        buttonLink: chooseCategoriesFE,
        secondButtonLink: '',
      });
    }
  }, []);

  useEffect(() => {
    if (!session?.token) {
      return;
    }
    
    getPricingService().then(res => {
      const fetchedPrices = res.data[0].find((price: any) => price.applicable_for === 'category');
      setPrices(fetchedPrices?.additional_info);
    });

  }, [session?.token]);

  useEffect(() => {
    if (!session?.token) {
      return;
    }
    setIsLoading(true);
    getCategoriesService(session.token).then((res: any) => {
      setCategories(res?.data?.map((category: any) => category));
      setIsLoading(false);
    });

    getUserCategoriesService(session.token).then(res => {
      setPreSelectedCategories(res.data);
    });

  }, [session?.token]);

  useEffect(() => {
    if (!session?.token) {
      return;
    }

    getTeamDetailsService(session.token).then(res => {
      setUserCount(res.data.members.length);
      setUserPrice(res.data.total_price / 100);
    });
  }, [session?.token]);

  useEffect(() => {
    if (!preSelectedCategories || !prices) {
      return;
    }

    const newTotalPrice = preSelectedCategories.reduce((accumulator: number, currentValue: any) => {
      return accumulator + (prices[(currentValue).category_id] ? prices[(currentValue).category_id] / 100 : 0);
    }, 0);

    setPrice(newTotalPrice);

  }, [preSelectedCategories, prices]);

  const handleToggle = (category: any) => {
    const alreadySelected = preSelectedCategories.find((el: any) => el.category_id === category.id);

    const getNewSelectedCategories = (s: any) => {
      if (alreadySelected) {
        return s.filter((el: any) => el.category_id !== category.id);
      }
      return [...s, {
        category_id: category.id,
        category: category,
      }];
    }

    setPreSelectedCategories(getNewSelectedCategories);
  };

  const {
    handleSubmit,
    formState: { isValid },
    control,
    register,
  } = useForm<ChooseCategoriesDTO>({
    defaultValues: {
      categories: [],
    },
    mode: 'onSubmit',
  });

  const chooseCategories = useSWRMutation(sendCategoriesUser, fetcher<HeadersInit, ChooseCategoriesDTO>);
  
  const { trigger } = chooseCategories;

  const submitForm = (payload: ChooseCategoriesDTO) => {
    trigger({
      body: parseObjectPropertiesToSnakeCase(payload),
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    })
      .then((res: any) => {
        setAlertState({
          type: 'success',
          title: '',
          content: individualChooseCategories.successMessage,
          show: true,
        });
        router.push(res.response.data.payment_link)
      })
      .catch((err) => {
        setAlertState({
          type: 'error',
          title: '',
          content: err.message,
          show: true,
        });
      });
  };

  const onSubmit:SubmitHandler<ChooseCategoriesDTO> = () => {
    const payload: ChooseCategoriesDTO = {
      categories: preSelectedCategories.map((category: any) => category.category?.id),
    };
    if (payload.categories.length === 0) {
      setModalOpen(true);
      setErrorModal({
        heading: 'Continue without instant categories',
        bodyText: 'Instant categories can boost your chances of press success! Receive notifications the minute a new opportunity arises, allowing for faster responses & even better results.',
        buttonText: 'No, go back',
        secondButtonText: 'Yes, continue',
        buttonLink: chooseCategoriesFE,
        secondButtonLink: () => submitForm(payload),
      })
    } else {
      submitForm(payload);
    }
  };

 

  return {
    Alert,
    setAlertState,
    session,
    categories,
    handleToggle,
    price,
    handleSubmit,
    register,
    onSubmit,
    isLoading,
    isModalOpen,
    setModalOpen,
    userCount,
    userPrice,
    preSelectedCategories,
    errorModalData,
  }
};
