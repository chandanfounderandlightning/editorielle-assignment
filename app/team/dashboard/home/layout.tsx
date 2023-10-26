"use client"

import GeneralSVG from "@/stories/assets/general.svg";
import NotificationsSVG from "@/stories/assets/notifications.svg";
import PlanSVG from "@/stories/assets/plan.svg";
import SupportSVG from "@/stories/assets/support.svg";
import Sidebar from "../components/Sidebar";
import { routes } from "@/common/routes";

const menuItems = [{
  id: 1,
  title: "General",
  icon: GeneralSVG,
  route: routes.team.dashboard.home.general,
},
{
  id: 2,
  title: "Notifications",
  icon: NotificationsSVG,
  route: routes.team.dashboard.home.notification,
},
{
  id: 3,
  title: "Plan",
  icon: PlanSVG,
  route: routes.team.dashboard.home.plan,

},
{
  id: 4,
  title: "Support",
  icon: SupportSVG,
  route: routes.team.dashboard.home.support,
}];

export default function HomeLayout ({
  children,
}: {
	children: React.ReactNode
}) {

  return (
    <>
      <Sidebar menuItems={menuItems} />
      <div className="lg:pl-72 lg:pt-10">
        {children}
      </div>
    </>
  )
}
