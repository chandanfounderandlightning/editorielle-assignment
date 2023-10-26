'use client';
import { Typography } from "@/common/components/atoms/typography";
import lang from "@/common/lang";
import UserInfoGeneral from "./components/userInfo/UserInfo";
import BusinessInfoGeneral from "./components/businessInfo/BusinessInfo";
import ResetPasswordGeneral from "./components/resetPassword/page";

const { generalDashboardHomeTeam } = lang;

const General = () => {

  return (
    <main className="lg:py-9">
      <div className="flex flex-col sm:flex-row pb-4 px-4 lg:px-8">
        <div className="w-full lg:w-[35%]">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {generalDashboardHomeTeam.userInformation}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal"
          >
            {generalDashboardHomeTeam.userInfoDesc}
          </Typography>
        </div>
        <div className="w-full lg:w-[60%] mt-5 mdsm:mt-0 lg:mt-0 pl-0 lg:pl-16">
          <UserInfoGeneral />
        </div>
      </div>
      <div className="flex px-4 lg:px-8 py-6">
        <hr className="w-full lg:w-[95%] bg-grey-200 border-t-[1px]" />
      </div>
      <div className="flex flex-col sm:flex-row pb-4 lg:py-4 px-4 lg:px-8">
        <div className="w-full lg:w-[35%]">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {generalDashboardHomeTeam.businessInformation}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal"
          >
            {generalDashboardHomeTeam.businessInfoDesc}
          </Typography>
        </div>
        <div className="w-full lg:w-[60%] mt-5 mdsm:mt-0 lg:mt-0 pl-0 lg:pl-16">
          <BusinessInfoGeneral />
        </div>
      </div>
      <div className="flex px-4 lg:px-8 py-6">
        <hr className="w-full lg:w-[95%] bg-grey-200 border-t-[1px]" />
      </div>
      <div className="flex flex-col sm:flex-row pb-4 lg:py-4 px-4 lg:px-8">
        <div className="w-full lg:w-[35%]">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {generalDashboardHomeTeam.resetPassword}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal"
          >
            {generalDashboardHomeTeam.resetPassDesc}
          </Typography>
        </div>
        <div className="w-full lg:w-[60%] mt-5 mdsm:mt-0 lg:mt-0 pl-0 lg:pl-16">
          <ResetPasswordGeneral />
        </div>
      </div>  
    </main>
  );
};

export default General;