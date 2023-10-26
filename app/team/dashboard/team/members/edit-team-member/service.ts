import {
  User, UserCamelCase, pauseDate,
} from './types';



export const submitService =
  (trigger: any) => (token: string | undefined, body: User | pauseDate | undefined, method: string) => {
    return trigger({
      body,
      method: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

export const setValues = (setValue:any, values: UserCamelCase) => {
  Object.entries(values).forEach(([key, value]: any) => {
    setValue(key, value);
  });
};
