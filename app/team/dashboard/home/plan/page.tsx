'use client';
import { Typography } from "@/common/components/atoms/typography";
import lang from "@/common/lang";
import CurrentPlan from "./components/currentPlan/page";
import Payment from "./components/payment/Payment";
import PauseSendoutsPlan from "./components/pauseSendouts/pauseSendout";
import DeleteAccount from "./components/deleteAccount/deleteAccount";

const { planDashboardHomeTeam } = lang;

const Plan = () => {
  return (
    <main className="lg:py-9">
      <div className="flex flex-col sm:flex-row px-4 lg:pl-16 lg:pr-32">
        <div className="w-full lg:w-[35%]">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {planDashboardHomeTeam.title}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal max-w-sm"
          >
            {planDashboardHomeTeam.description}
          </Typography>
        </div>
        <div className="w-full lg:w-[65%] mt-8 lg:mt-0 pl-0 md:pl-10 lg:pl-6">
          <CurrentPlan />
        </div>
      </div>
      <div className="flex px-4 sm:px-6 lg:px-8 py-8 px-4 lg:pl-16 lg:pr-32">
        <hr className="w-full lg:w-[100%] bg-grey-200 border-[1px]" />
      </div>
      <div className="flex flex-col sm:flex-row px-4 lg:pl-16 lg:pr-32">
        <div className="w-full lg:w-[35%] mdsm:mr-2">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {planDashboardHomeTeam.pauseSendoutTitle}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal max-w-sm"
          >
            {planDashboardHomeTeam.pauseSendoutDesc}
          </Typography>
        </div>
        <div className="w-full lg:w-[65%] mt-8 lg:mt-0 pl-0 md:pl-10 lg:pl-6">
          <PauseSendoutsPlan />
        </div>
      </div>
      <div className="flex px-4 sm:px-6 lg:px-8 py-8 px-4 lg:pl-16 lg:pr-32">
        <hr className="w-full lg:w-[100%] bg-grey-200 border-[1px]" />
      </div>
      <div className="flex flex-col sm:flex-row px-4 lg:pl-16 lg:pr-32">
        <div className="w-full lg:w-[35%]">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {planDashboardHomeTeam.payment}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal max-w-sm"
          >
            {planDashboardHomeTeam.manageYourPaymentDetails}
          </Typography>
        </div>
        <div className="w-full lg:w-[65%] mt-5 lg:mt-0 pl-0 md:pl-10 lg:pl-6">
          <Payment />
        </div>
      </div>
      <div className="flex px-4 sm:px-6 lg:px-8 py-8 px-4 lg:pl-16 lg:pr-32">
        <hr className="w-full lg:w-[100%] bg-grey-200 border-[1px]" />
      </div>
      <div className="flex flex-col sm:flex-row px-4 lg:pl-16 lg:pr-32">
        <div className="w-full lg:w-[35%]">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {planDashboardHomeTeam.deleteTitle}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal max-w-sm"
          >
            {planDashboardHomeTeam.deleteDesc}
          </Typography>
        </div>
        <div className="w-full lg:w-[65%] mt-5 lg:mt-0 pl-0 md:pl-10 lg:pl-6">
          <DeleteAccount />
        </div>
      </div>
      <div className="flex px-4 sm:px-6 lg:px-8 py-8 px-4 lg:pl-16 lg:pr-32">
      </div>
    </main>
  );
};

export default Plan;