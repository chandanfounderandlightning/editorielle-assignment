import {
  userCardDetails,
  stripeDetails, 
} from "@/common/utils/network/endpoints";
import axios from "axios";
  
export const getPaymentService = (token: string) => {
  return axios({
    method: 'get',
    url: userCardDetails,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data, (err) => err);
}

export const getStripeDetails = (token: string) => {
  return axios({
    method: 'get',
    url: stripeDetails,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data, (err) => err);
}

