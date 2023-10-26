export type Field = {
  wrapClassName: string;
  name: "firstName" | "lastName" | "email";
  dataCY: string;
  placeholder: string;
};

export interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export type User = {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  is_nominated?: boolean;
};
