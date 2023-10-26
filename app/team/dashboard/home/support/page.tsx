'use client';
import { Typography } from "@/common/components/atoms/typography";
import lang from "@/common/lang";
import { Button } from "@/common/components/atoms";

const { contactDashboardHomeTeam } = lang;

const Support = () => {
  return (
    <main className="py-9">
      <div className="flex px-4 sm:px-6 lg:px-8">
        <div className="w-[35%]">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {contactDashboardHomeTeam.title}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal"
          >
            {contactDashboardHomeTeam.description}
          </Typography>
        </div>
        <div className="w-[60%]">
          <div className="p-8 border rounded-lg">
            <div className="flex flex-wrap sm:justify-between">
              <Typography
                variant="heading-sm"
                classes="text-grey-900 text-base font-semibold"
              >
                {contactDashboardHomeTeam.innerTitle}
              </Typography>

              <Typography
                variant="body-sm"
                classes="text-grey-500 text-base font-normal mt-5"
              >
                {contactDashboardHomeTeam.innerDescription}
              </Typography>

              <div className="mt-5">
                <Button
                  variant="solid"
                  size="sm"
                >
                  {contactDashboardHomeTeam.buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </main>
  );
};

export default Support;