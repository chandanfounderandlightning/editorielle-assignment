import { EditInvitedTeamMemberDTO, ErrorModalData } from "@/app/account/types";
import { useAlert } from "@/common/components/molecules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { editInviteMemberValidationSchema } from "./validationSchema";
import { parseObjectPropertiesToSnakeCase } from "@/common/utils/helpers";
import useSWRMutation from "swr/mutation";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { useSession } from "next-auth/react";
import { team } from "@/common/utils/network/endpoints";
import { setValues, submitService } from "./service";
import { isMemberActive, trimData } from "./utils";
import lang from "@/common/lang";

const { getMembersWithStatus, pauseMember } = team;
const { warningModalOnEditMember } = lang;

export const useEditTeamMember = ({ setOpenStatus, memberId }: any) => {
  const { setAlertState, Alert } = useAlert();
  const { data: session } = useSession();
  const [refetchToggle, setRefetchToggle] = useState(false);
  const resolver = { resolver: yupResolver(editInviteMemberValidationSchema) };
  const [isPauseSendoutDisabled, setIsPauseSendoutDisabled] = useState(true);
  const [name, setName] = useState("");
  const [pauseTill, setPauseTill] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [warningModalData, setWarningModalData] = useState<ErrorModalData>({
    heading: "",
    bodyText: "",
    buttonText: "",
    secondButtonText: "",
    buttonLink: null,
    secondButtonLink: null,
  });

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { isDirty },
  } = useForm<EditInvitedTeamMemberDTO>({
    ...resolver,
    mode: "onSubmit",
  });
  const pauseDateValue = watch("pauseDate");

  useEffect(() => {
    if (pauseDateValue && isDirty) {
      setIsPauseSendoutDisabled(false);
    } else {
      setIsPauseSendoutDisabled(true);
    }
  }, [pauseDateValue]);

  const closePopup = () => {
    setOpenStatus(false);
    reset();
    setRefetchToggle(!refetchToggle);
    setAlertState({
      type: "success",
      title: "",
      content: "",
      show: false,
    });
  };

  const pauseUrl = pauseMember + "/" + memberId;
  const pausemember = useSWRMutation(pauseUrl, fetcher<HeadersInit>);
  const { trigger: pauseMemberTrigger, isMutating: pauseLoading } = pausemember;

  const pauseSendOut = async () => {
    const payload = {
      pause_till: pauseDateValue,
    };
    submitService(pauseMemberTrigger)(
      session?.token,
      parseObjectPropertiesToSnakeCase(payload),
      "PUT"
    )
      .then((res: any) => {
        setAlertState({
          type: "success",
          title: "",
          content: res.response.message,
          show: true,
        });
        setOpenStatus(false);
        reset();
        setRefetchToggle(!refetchToggle);
        setAlertState({
          type: "success",
          title: "",
          content: "",
          show: false,
        });
      })
      .catch((error: any) => {
        setAlertState({
          type: "error",
          title: "",
          content: error?.message,
          show: true,
        });
      });
  };

  useEffect(() => {
    setIsLoading(true);
    fetcher(getMembersWithStatus, {
      arg: {
        headers: {
          Authorization: `Bearer ${session?.token}`,
        },
        method: "GET",
      },
    }).then((res: any) => {
      const response = res.response.data.find(
        (member: any) => member.id === memberId
      );
      setValues(setValue, {
        firstName: response.first_name,
        lastName: response.last_name,
        email: response.email,
      });
      if (response.pause_till !== null) {
        const checkMemberStatus = isMemberActive(response.pause_till);
        if (checkMemberStatus == 1) {
          setValue("pauseDate", response.pause_till);
        }
      } else {
        setValue("pauseDate", "");
      }
      setName(trimData(response.first_name + " " + response.last_name));
      setPauseTill(response.pause_till);
      setIsLoading(false);
    });
  }, [session, memberId, refetchToggle]);

  const updateMemberUrl = getMembersWithStatus + "/" + memberId;
  const inviteNewMember = useSWRMutation(
    updateMemberUrl,
    fetcher<HeadersInit, EditInvitedTeamMemberDTO>
  );
  const { trigger, isMutating } = inviteNewMember;

  const onSubmitData: SubmitHandler<EditInvitedTeamMemberDTO> = async (
    data
  ) => {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };

    submitService(trigger)(
      session?.token,
      parseObjectPropertiesToSnakeCase(payload),
      "PUT"
    )
      .then((res: any) => {
        setAlertState({
          type: "success",
          title: "",
          content: res.response.message,
          show: true,
        });
        setOpenStatus(false);
        reset();
        setRefetchToggle(!refetchToggle);
        setAlertState({
          type: "success",
          title: "",
          content: "",
          show: false,
        });
      })
      .catch((error: any) => {
        setAlertState({
          type: "error",
          title: "",
          content: error.message,
          show: true,
        });
      });
  };

  const deleteMemberUrl = getMembersWithStatus + "/" + memberId;
  const deleteMember = useSWRMutation(
    deleteMemberUrl,
    fetcher<HeadersInit, EditInvitedTeamMemberDTO>
  );
  const { trigger: deleteAMember } = deleteMember;
  const deleteTeamMember = () => {
    submitService(deleteAMember)(session?.token, undefined, "DELETE").then(
      () => {
        setOpenStatus(false);
      }
    );
  };

  const handleDelete = async () => {
    setWarningModal(true);
    setWarningModalData({
      heading: warningModalOnEditMember.heading,
      bodyText: warningModalOnEditMember.bodyText,
      buttonText: warningModalOnEditMember.buttonText,
      secondButtonText: warningModalOnEditMember.secondButtonText,
      buttonLink: null,
      secondButtonLink: deleteTeamMember,
    });
  };

  const [className, setClassName] = useState("fixed mt-6");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 400) {
        setClassName("static mt-6");
      } else {
        setClassName("fixed");
      }
    }
  }, []);

  return {
    closePopup,
    Alert,
    name,
    pauseTill,
    isLoading,
    onSubmitData,
    handleDelete,
    isMutating,
    handleSubmit,
    control,
    isPauseSendoutDisabled,
    pauseSendOut,
    pauseLoading,
    className,
    warningModal,
    warningModalData,
    setWarningModal,
  };
};
