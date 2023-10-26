'use client';

import { Button } from "@/common/components/atoms";
import CustomLink from "@/common/designSystem/link/CustomLink";
import { usePathname } from "next/navigation";

interface MenuItem {
  id: number;
  title: string;
  route: string;
  icon: React.ElementType;
}
interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar = ({ menuItems }: SidebarProps) => {

  const pathName = usePathname();

  const renderMenuItems = () => {
    return menuItems?.map((item: MenuItem) => {
      const Icon = item.icon;
      return <CustomLink key={item.id} href={item.route}>
        <Button
          variant="solid"
          size="sm"
          data-cy={item.title}
          className={`flex mb-2 lg:w-full px-4 py-2 text-left text-sm rounded-md font-semibold ${pathName.includes(item.route) ? 'text-rose-400 bg-grey-50' : 'text-gray-700'}`}
        >
          <Icon fill={pathName.includes(item.route) ? '#f43f5e' : '#4b5563'} className={`h-5 w-5 inline-block mr-2`} /> {item.title}
        </Button>
      </CustomLink>
    });
  }

  return (
    <div className="lg:absolute lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col lg:mt-[4.65rem]">
      <div className="flex grow flex-col overflow-y-auto bg-white lg:pb-4">
        <div className="flex flex-1 flex-col lg:pt-14">
          <div className="hidden lg:block p-4 px-8">
            {renderMenuItems()}
          </div>
          <div className="block lg:hidden p-4 px-4 flex space-x-4">
            {renderMenuItems()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;