"use client";
import { Toggle } from "@/common/components/molecules/toggle";
import lang from "@/common/lang";

const { individualAddTeamMember } = lang;

export const SendToToggle = ({
  checked,
  change,
  classes,
}: {
  checked: boolean;
  change: (checked: boolean) => void;
  classes: string;
}) => {
  return (
    <Toggle
      data-cy="email-toggle"
      labelText={
        checked
          ? individualAddTeamMember.toggleText
          : individualAddTeamMember.toggleTextInActive
      }
      checked={checked}
      classes={classes}
      onChange={() => change(!checked)}
    />
  );
};
