import {
  Fragment, useState, 
} from "react";
import {
  Popover, Transition, 
} from "@headlessui/react";
import { Button } from "@/common/components/atoms";
import { logoutUrl } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import useSWRMutation from "swr/mutation";
import {
  signOut, useSession, 
} from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "@/common/designSystem";

export const FlyoutMenu = ({ UserButton }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const logOutMember = useSWRMutation(logoutUrl, fetcher<HeadersInit>);
  const { trigger } = logOutMember;

  const handleLogout = async () => {
    setIsLoading(true);
    await trigger({
      method: "POST",
      headers: {
        Authorization: "Bearer " + session?.token,
      },
    }).then(async () => {
      await signOut({ redirect: false });
      router.push("/account/signin");
    });
  };

  const menuItems = [
    {
      id: 1,
      name: "Home",
      function: () => router.push("/team/dashboard/home/general"),
    },
    {
      id: 2,
      name: "Team",
      function: () => router.push("/team/dashboard/team/members"),
    },
    {
      id: 3,
      name: "Help",
      function: void 0,
    },
    {
      id: 4,
      name: "Logout",
      function: handleLogout,
    },
  ];

  return (
    <Fragment>
      {isLoading && <Loader />}
      <Popover>
        {({
          open, close, 
        }) => (
          <>
            <Popover.Button>{UserButton}</Popover.Button>
            {open && (
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute top-12 right-4 z-10 mt-5 flex px-4">
                  <div className="w-screen max-w-[200px] rounded-[6px] bg-white text-sm leading-6 shadow-lg">
                    {menuItems.map((item) => (
                      <Popover.Button
                        as={Button}
                        variant="solid"
                        size="sm"
                        data-cy={item.name}
                        className={`w-full text-left px-3 py-2 hover:bg-grey-50 ${
                          item.id === menuItems.length
                            ? "border-t text-red-500"
                            : "text-grey-900"
                        }`}
                        onClick={() => {
                          close();
                          item.function?.();
                        }}
                        key={item.id}
                      >
                        {item.name}
                      </Popover.Button>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            )}
          </>
        )}
      </Popover>
    </Fragment>
  );
};
