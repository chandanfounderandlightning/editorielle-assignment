"use client";
import { Button } from "@/common/components/atoms";
import { Typography } from "@/common/components/atoms/typography";
import { Loader } from "@/common/designSystem";
import lang from "@/common/lang";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { team } from "@/common/utils/network/endpoints";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import EditMemberSlideOver from "../edit-team-member/editTeamSlideOver";
import { isMemberActive } from "../edit-team-member/utils";

const { getMembersWithStatus } = team;
const { teamMembersTeamDashboard, editTeamMembersTeamDashboard } = lang;

const TeamMembersComponent = ({ state: state = false }) => {
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const activeClass = "border-green-600 text-green-700 bg-green-50";
  const pauseClass = "border-grey-600 text-grey-700 bg-grey-50";
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [memberId, setMemberId] = useState(0);
  const [adminId, setAdminId] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    if (!slideOverOpen) {
      setIsLoading(true);
      fetcher(getMembersWithStatus, {
        arg: {
          headers: {
            Authorization: `Bearer ${session?.token}`,
          },
          method: "GET",
        },
      }).then((res: any) => {
        const sortedMembers = res.response.data.sort(
          (a: any, b: any) => a.id - b.id
        );
        setMembers(sortedMembers);
        setAdminId(sortedMembers[0].id);
        setIsLoading(false);
      });
    }
  }, [session, state, slideOverOpen]);

  const trimData = (text: string) => {
    let length = 20;

    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 400) {
        length = 5;
      } else if (screenWidth <= 450) {
        length = 8;
      } else if (screenWidth <= 640) {
        length = 10;
      } else if (screenWidth <= 1024) {
        length = 15;
      } else {
        length = 30;
      }
    }

    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  };

  const openEditSlideOver = (memberId: number) => {
    setSlideOverOpen(true);
    setMemberId(memberId);
  };

  const getInitials = (firstName: string, lastName: string) => {
    const getInitial = (name: string) => {
      if (name.includes("-")) {
        return name.charAt(name.indexOf("-") + 1).toUpperCase();
      }
      return name.charAt(0).toUpperCase();
    };

    return getInitial(firstName) + getInitial(lastName);
  };

  return (
    <div className="px-0 lg:px-8">
      {isLoading && <Loader />}
      {members.map((member: any, index: number) => (
        <div
          className={`flex flex-row border border-grey-100 px-4 lg:px-8 pt-4 pb-0.5 lg:pt-5 lg:pb-2
          ${index === 0 ? "rounded-t-xl" : ""} 
          ${index === members.length - 1 ? "rounded-b-xl" : ""}`}
          key={member.id}
        >
          <div className="mb-4 sm:mb-0 flex-shrink-0 pr-4">
            <div className="h-10 w-10 px-5 py-5 rounded-full flex items-center justify-center border-2 border-rose-200 bg-rose-200">
              <span className="text-grey-700 text-lg font-semibold uppercase">
                {getInitials(member.first_name, member.last_name)}
              </span>
            </div>
          </div>

          <div
            className="mdsm:mb-4 lg:mb-4 flex-grow flex flex-col lg:justify-between"
            data-cy={index}
          >
            <div className="flex">
              <Typography
                variant="body-sm"
                classes="hidden lg:block text-grey-700 text-sm font-semibold text-left"
              >
                {trimData(member.first_name + " " + member.last_name)}
              </Typography>
              <Typography
                variant="body-sm"
                classes="block lg:hidden text-grey-700 text-sm font-semibold max-w-[200px] text-left"
              >
                {trimData(member.first_name + " " + member.last_name)}
              </Typography>

              <p
                className={`text-xs font-medium py-0.5 px-1.5 border rounded-md ml-3 ${
                  isMemberActive(member.pause_till) !== 1
                    ? activeClass
                    : pauseClass
                }`}
              >
                {isMemberActive(member.pause_till) !== 1 ? "Active" : "Paused"}
              </p>
            </div>

            <Typography
              variant="body-sm"
              classes="block lg:hidden text-grey-700 text-sm font-normal mt-1 max-w-[200px] lg:max-w-none"
            >
              {trimData(member.email)}
            </Typography>
            <Typography
              variant="body-sm"
              classes="hidden lg:block text-grey-700 text-sm font-normal mt-1 max-w-[200px] lg:max-w-none"
            >
              {member.email}
            </Typography>
          </div>

          <div className="flex-shrink-0">
            <Button
              size="sm"
              variant="solid"
              className="bg-white text-grey-600 font-semibold text-sm py-2 px-3 rounded-md border border-grey-300"
              data-cy={member.id}
              onClick={() => openEditSlideOver(member.id)}
            >
              {teamMembersTeamDashboard.editButton}
            </Button>
          </div>
        </div>
      ))}
      <EditMemberSlideOver
        openStatus={slideOverOpen}
        setOpenStatus={setSlideOverOpen}
        description={editTeamMembersTeamDashboard.description}
        firstNameLabel={editTeamMembersTeamDashboard.firstName}
        lastNameLabel={editTeamMembersTeamDashboard.lastName}
        emailLabel={editTeamMembersTeamDashboard.email}
        pauseTitle={editTeamMembersTeamDashboard.pauseTitle}
        pauseInfo={editTeamMembersTeamDashboard.pauseInfo}
        cancelButton={editTeamMembersTeamDashboard.cancelButton}
        submitButton={editTeamMembersTeamDashboard.editMemberButton}
        memberId={memberId}
        pauseDateLabel={editTeamMembersTeamDashboard.pauseInputLabel}
        pauseButtonText={editTeamMembersTeamDashboard.pauseButton}
        adminId={adminId}
      />
    </div>
  );
};

export default TeamMembersComponent;
