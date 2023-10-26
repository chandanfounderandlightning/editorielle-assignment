import { InputProps } from "@/common/components/atoms/input/types";

export type AddTeamSlideOverParams = {
  openStatus: boolean,
  setOpenStatus: (status: boolean) => void,
  title: string,
  description: string,
  firstNameLabel: string,
  lastNameLabel: string,
  emailLabel: string,
  info: string,
  cancelButton: string,
  submitButton: string,
};

export type InputFieldParams = {
  control: any,
  name: string,
  type: InputProps['type'],
  dataCy: string,
  labelText: string,
  placeholder?: string,
  min?: string | number | undefined,
  disabled?: boolean,
  required?: boolean,
}