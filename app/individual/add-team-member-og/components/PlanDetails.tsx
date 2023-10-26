"use client";
import { Typography } from "@/common/components/atoms/typography";
import lang from "@/common/lang";
import UserGroup from "@/stories/assets/user-group.svg";

const { individualAddTeamMember } = lang;

export const PlanDetails = () => {
  return (
    <>
      <Typography
        variant="heading-md"
        classes="font-semibold hidden lg:block text-xl leading-7 text-grey-900"
      >
        {individualAddTeamMember.priceHeader}
      </Typography>
      <Typography
        variant="body-sm"
        classes="font-normal lg:mt-3 hidden lg:block text-grey-700"
      >
        {individualAddTeamMember.priceBody}
      </Typography>
      <div className="flex border rounded-md mt-3 lg:mt-8 items-center justify-center h-12 text-grey-300 border-solid">
        <div className="bg-red-200 p-3 rounded-l-md">
          <UserGroup className="h-6 w-6 pl-0.5" />
        </div>
        <div className="flex-grow pl-2">
          <Typography
            variant="body-sm"
            classes="font-normal text-grey-700 text-xs"
          >
            {individualAddTeamMember.memberCountText}
          </Typography>
        </div>
        <div className="pl-2 pr-4">
          <Typography
            variant="body-md"
            classes="font-bold text-grey-900 text-base"
          >
            {individualAddTeamMember.memberCount}
          </Typography>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex-grow">
          <div className="mt-3 lg:mt-8">
            <Typography
              variant="body-md"
              classes="hidden lg:block text-base font-bold text-grey-900 pl-2 mt-2.5"
            >
              {individualAddTeamMember.total}
              <span className="font-semibold">
                {individualAddTeamMember.price}
              </span>
              <span className="text-xs font-normal">
                {individualAddTeamMember.vat}
              </span>
            </Typography>
            <Typography
              variant="body-md"
              classes="block lg:hidden text-base font-bold text-grey-900 pl-2 mt-2.5"
            >
              {individualAddTeamMember.total}
              <span className="font-semibold">
                {individualAddTeamMember.price}
              </span>
              <br />
              <span className="text-xs font-normal">
                {individualAddTeamMember.vat}
              </span>
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};
