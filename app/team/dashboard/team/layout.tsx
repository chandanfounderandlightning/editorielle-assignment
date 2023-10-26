"use client"
import CategoriesSVG from "@/stories/assets/categories.svg";
import MembersSVG from "@/stories/assets/members.svg";
import Sidebar from "../components/Sidebar";
import { routes } from "@/common/routes";

const menuItems = [
  {
    id: 1,
    title: "Members",
    icon: MembersSVG,
    route: routes.team.dashboard.team.members,
  },
  {
    id: 2,
    title: "Categories",
    icon: CategoriesSVG,
    route: routes.team.dashboard.team.categories,
  },
];

export default function TeamLayout ({
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
