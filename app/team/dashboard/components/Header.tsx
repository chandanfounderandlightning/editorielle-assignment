'use client';
import Image from "next/image";
import Logo from "@/stories/assets/logo.jpg"
import { useSession } from "next-auth/react";
import { routes } from "@/common/routes";
import { usePathname } from "next/navigation";
import CustomLink from "@/common/designSystem/link/CustomLink";
import { FlyoutMenu } from "./flyoutMenu";

const Header = () => {
  const {
    data: session,
  } = useSession();

  return (
    <div>
      <div className="p-4 px-4 lg:px-8 flex justify-between items-center border-b-[1px] border-solid border-grey-200">
        {/* // TODO::::: create a wrapper component for next/image */}
        <Image src={Logo} alt="logo" width={32} height={32} className="rounded" />

        <div className="space-x-4">
          <CustomLink
            href={routes.team.dashboard.home.general}
            data-cy={"home"}
            className={`px-4 py-2 font-medium text-sm ${usePathname().includes(routes.team.dashboard.home.default) ? 'bg-rose-200 rounded-md border border-rose-200' : 'bg-white'} text-grey-900`}
          >
            Home
          </CustomLink>
          <CustomLink
            href={routes.team.dashboard.team.members}
            data-cy={"team"}
            className={`px-4 py-2 font-medium text-sm ${usePathname().includes(routes.team.dashboard.team.default) ? 'rounded-md border border-rose-200 bg-rose-200' : 'bg-white'} text-grey-900`}
          >
            Team
          </CustomLink>
        </div>

        <div className="flex items-center space-x-2">
          <FlyoutMenu
            UserButton={
              <div className="h-10 w-10 rounded-full flex items-center justify-center border-2 border-rose-200">
                <span className="text-grey-900 uppercase" data-cy={'userAvatar'}>
                  {session && session.user && session?.user.firstName.slice(0, 1) + session?.user.lastName.slice(0, 1)}
                </span>
              </div>
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Header;