'use client';
import { Typography } from "@/common/components/atoms/typography";
import lang from "@/common/lang";
import { Button } from "@/common/components/atoms";
import { useNotifications } from "./useNotifications";
import { GetTimeDifference } from "./getTimeDifference";
import { getButtonName } from "./getButtonName";

const { notificationsDashboardHomeTeam } = lang;

const Notifications = () => {
  const {
    notificationSampleData,
  } = useNotifications();
  
  return (
    <main className="py-9">
      <div className="flex px-4 lg:pl-16 sm:px-6 lg:pr-32">
        <div className="w-[35%]">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {notificationsDashboardHomeTeam.title}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal"
          >
            {notificationsDashboardHomeTeam.description}
          </Typography>
        </div>
        <div className="w-[60%]">
          {notificationSampleData.length === 0 ? (
            <div className="py-5 px-4 border border-gray-200 rounded-xl">
              <Typography
                variant="heading-md"
                classes="text-grey-900 text-base font-semibold"
              >
                {notificationsDashboardHomeTeam.noNewNotifications}
              </Typography>
            </div>
          ) :
            ( notificationSampleData.map(({
              created_at,type, data: {
                message,
              }, 
            }, index) => {
              const buttonName = getButtonName(type)
              const calculatedtimeDifference = GetTimeDifference(created_at);
              return (
                <div key={index} className={`py-5 px-4 border border-gray-200  ${index === 0 ? 'rounded-t-xl' : ''} ${index === notificationSampleData.length - 1 ? 'rounded-b-xl border-b' : 'border-b-0'} group`}>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-x-4">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-rose-200">
                        <span className="text-grey-900 uppercase">
                          {'M' + 'R'}
                        </span>
                      </div>
                      <div>
                        <Typography
                          variant="body-sm"
                          classes="text-grey-900 text-sm font-semibold"
                        >
                          {buttonName}
                        </Typography>
                        <Typography
                          variant="body-sm"
                          classes="text-grey-500 text-xs font-medium"
                        >
                          {calculatedtimeDifference.formattedTime} ago
                        </Typography>
                      </div>
                    </div>
                    <Button
                      variant="solid"
                      size="sm"
                      className="text-sm font-normal text-rose-300 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                   Remove
                    </Button>
                  </div>
                  <div className="mt-4">
                    <Typography
                      variant="body-sm"
                      classes="text-grey-500 text-sm font-normal"
                    >
                      {message}
                    </Typography>
                  </div>
                  <div className="mt-5">
                    <Button
                      variant="solid"
                      size="sm"
                    >
                      {buttonName}
                    </Button>
                  </div>
                </div>
              );
            }))}
        </div>
      </div> 
    </main>
  );
};

export default Notifications;