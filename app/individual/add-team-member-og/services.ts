import { individual } from "@/common/utils/network/endpoints";
import axios, {
  AxiosError, AxiosResponse, 
} from "axios";
import { User } from "./types";

export const getNominatedMemberService = (token: string) => {
  const { addTeamMemberUrl } = individual;

  return axios({
    method: "GET",
    url: addTeamMemberUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(
    (res: AxiosResponse<any>) => res?.data,
    (err: AxiosError<any>) => err,
  );
};

export const addMemberService =
  (trigger: any) => (token: string | undefined, body: User) => {
    return trigger({
      body,
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
