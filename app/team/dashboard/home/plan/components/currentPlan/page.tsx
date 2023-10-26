'use client';
import { Typography } from "@/common/components/atoms/typography";
import lang from "@/common/lang";
import UserGroup from "@/stories/assets/user-group-outline.svg";
import Users from "@/stories/assets/users.svg";
import SquaresPlus from "@/stories/assets/squares-plus-outline.svg";
import Link from "next/link";
import { Loader } from "@/common/designSystem";
import { useCurrentPlan } from "./useCurrentPlan";
import {
  teamAdminDashboardMembersPageUrl, teamAdminDashboardCategoriesPageUrl, 
} from "@/common/utils/network/appRoutes";


const { planDashboardHomeTeam } = lang;

const CurrentPlan = () => {
  const {
    planDetails,
    isLoading,
    teamPlanPrice,
  } = useCurrentPlan();
  
 
  const {
    team_members_count, instant_categories_count, 
  } = planDetails;
  
  return (
    <>
      <div className="px-4 py-5 border border-gray-200 rounded-lg">
        {isLoading && <Loader />}
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex items-center gap-x-4">
            <div className="bg-rose-200 p-3 rounded-md">
              <UserGroup className="h-6 w-6" />
            </div>
            <div>
              <Typography
                variant="body-sm"
                classes="pt-1 text-grey-500 text-sm font-medium max-w-sm"
              >
                {planDashboardHomeTeam.teamPlan}
              </Typography>
              <Typography variant="body-2xl" classes="lg:block font-semibold text-grey-900">
                {teamPlanPrice ? `£${teamPlanPrice}/month` : null}
              </Typography>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-8 lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
        <div className="border border-gray-200 rounded-lg w-full lg:w-1/2">
          <Link href={`${teamAdminDashboardMembersPageUrl}`}>
            <div className="p-4 flex flex-col sm:flex-row sm:justify-between">
              <div className="flex items-center gap-x-4">
                <div className="bg-rose-200 p-3 rounded-md">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <Typography
                    variant="body-sm"
                    classes="pt-1 text-grey-500 text-sm font-medium max-w-sm"
                  >
                    {planDashboardHomeTeam.teamMembers}
                  </Typography>
                  <Typography variant="body-2xl" classes="lg:block font-semibold text-grey-900">
                    {team_members_count}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="p-4 bg-grey-50 rounded-b-lg text-sm text-rose-300 hover:text-rose-400">
              {planDashboardHomeTeam.manageTeam}
            </div>
          </Link>
        </div>
        <div className="border border-gray-200 rounded-lg w-full lg:w-1/2 mt-6 lg:mt-0">
          <Link href={`${teamAdminDashboardCategoriesPageUrl}`}>
            <div className="p-4 flex flex-col sm:flex-row sm:justify-between">
              <div className="flex items-center gap-x-2.5 md:gap-x-4 lg:gap-x-4">
                <div className="bg-rose-200 p-3 rounded-md">
                  <SquaresPlus className="h-6 w-6" />
                </div>
                <div>
                  <Typography
                    variant="body-sm"
                    classes="pt-1 text-grey-500 text-sm font-medium max-w-sm"
                  >
                    {planDashboardHomeTeam.instantCategoryLists}
                  </Typography>
                  <Typography variant="body-2xl" classes="lg:block font-semibold text-grey-900">
                    {instant_categories_count}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="p-4 bg-grey-50 rounded-b-lg text-sm text-rose-300 hover:text-rose-400">
              {planDashboardHomeTeam.manageCategories}
            </div>
          </Link>
        </div>
      </div>

    </>
  );
};

export default CurrentPlan;