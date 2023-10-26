import {
  getCategoriesUrl, getPricingUrl, individual, 
} from "@/common/utils/network/endpoints";
import axios from "axios";

export const getCategoriesService = (token: string) => {
  return axios({
    method: 'get',
    url: getCategoriesUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data, (err) => err);
}

export const getPricingService = () => {
  return axios({
    method: 'GET',
    url: getPricingUrl,
  }).then(res => res.data, (err) => err);
}

export const getUserCategoriesService = (token: string) => {
  const { sendCategoriesUser } = individual;

  return axios({
    method: 'get',
    url: sendCategoriesUser,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data, (err) => err);
}