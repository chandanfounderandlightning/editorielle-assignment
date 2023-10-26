'use client';
import { Typography } from "@/common/components/atoms/typography";
import lang from "@/common/lang";
import TeamMembersComponent from "./components/Members";
import { Button } from "@/common/components/atoms";
import { useState } from "react";
import SlideOver from "./add-team-member/addTeamSlideOver";

const {
  teamMembersTeamDashboard, addTeamMembersTeamDashboard,
} = lang;

const TeamMembers = () => {
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  return (
    <main className="lg:py-9">
      <div className="flex flex-col sm:flex-row pb-4 px-4 lg:px-8">
        <div className="w-full lg:w-[35%]">
          <Typography
            variant="heading-md"
            classes="text-grey-900 text-base font-semibold"
          >
            {teamMembersTeamDashboard.title}
          </Typography>
          <Typography
            variant="body-sm"
            classes="pt-1 text-grey-700 text-sm font-normal mt-2"
          >
            {teamMembersTeamDashboard.description}
          </Typography>
          <div className="mt-3 lg:mt-5 mb-8">
            <Button
              variant="solid"
              size="sm"
              type="button"
              data-cy={'addMember'}
              onClick={() => setSlideOverOpen(true)}
            >
              {teamMembersTeamDashboard.addMember}
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-[64%] lg:mt-0 pl-0 lg:pl-10">
          <TeamMembersComponent state={slideOverOpen} />
        </div>
      </div>
      <SlideOver
        openStatus={slideOverOpen}
        setOpenStatus={setSlideOverOpen}
        title={addTeamMembersTeamDashboard.title}
        description={addTeamMembersTeamDashboard.description}
        firstNameLabel={addTeamMembersTeamDashboard.firstName}
        lastNameLabel={addTeamMembersTeamDashboard.lastName}
        emailLabel={addTeamMembersTeamDashboard.email}
        info={addTeamMembersTeamDashboard.info}
        cancelButton={addTeamMembersTeamDashboard.cancelButton}
        submitButton={addTeamMembersTeamDashboard.addMemberButton}
      />
    </main>
  );
};

export default TeamMembers;