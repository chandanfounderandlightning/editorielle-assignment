import {
  getCategoriesUrl, getPricingUrl, team,
} from "@/common/utils/network/endpoints";
import axios from "axios";
  

const {
  sendCategoriesUser, addTeamMemberUrl,
} = team;
  
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
  
  return axios({
    method: 'get',
    url: sendCategoriesUser,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data, (err) => err);
}

export const getTeamDetailsService = (token: string) => {
  
  return axios({
    method: 'get',
    url: addTeamMemberUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data, (err) => err);
}