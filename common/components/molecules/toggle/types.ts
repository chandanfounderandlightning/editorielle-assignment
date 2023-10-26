import { ToggleProps } from "@/common/components/atoms/toggle/types";

export type MoleculeToggleProps = ToggleProps & {
  /** The label text of the toggle */
  labelText?: string;
  /** The optional classes for the toggle */
  classes?: string;
}
