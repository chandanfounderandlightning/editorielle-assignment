"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader } from "@/common/designSystem";
import { team, getCategoriesUrl } from "@/common/utils/network/endpoints";
import { fetcher } from "@/common/utils/network/baseFetcher";
import { Typography } from "@/common/components/atoms/typography";
import UserColumn from "./categoriesOptions/UserColumn";
const { getMembersWithStatus } = team;

const TeamCategories = ({ state: state = false }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [categories, setCategories] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.token) {
      setIsLoading(true);
      fetcher(getMembersWithStatus, {
        arg: {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
          method: "GET",
        },
      }).then((res: any) => {
        const sortedMembers = res.response.data.sort(
          (a: any, b: any) => a.id - b.id
        );
        setMembers(sortedMembers);
        setIsLoading(false);
      });

      fetcher(getCategoriesUrl, {
        arg: {
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
          method: "GET",
        },
      }).then((res: any) => {
        const sortedList = res.response.data.sort(
          (a: any, b: any) => a.id - b.id
        );
        setCategories(sortedList);
        setIsLoading(false);
      });
    }
  }, [session?.token]);

  const onCategorieChange = (option: any, memberIndex: number, index: any) => {
    const updatedMembers = [...members];
    updatedMembers[memberIndex].categories[index] = option;
    setMembers(updatedMembers);
  };

  return (
    <>
      {isLoading && <Loader />}
      <main className="py-9">
        <div className="flex px-4 sm:px-6 lg:px-8">
          <div className="w-[35%]">
            <Typography
              variant="heading-md"
              classes="text-grey-900 text-base font-semibold"
            >
              Instant categories
            </Typography>
            <Typography
              variant="body-sm"
              classes="pt-2 text-grey-700 text-sm font-normal w-[350px]"
            >
              Here’s a look at the categories your team has chosen for their
              round-the-clock alerts.
            </Typography>
          </div>
          <div className="w-[60%]">
            <div className="p-4 px-8">
              <UserColumn
                onCategorieChange={onCategorieChange}
                memberData={members}
                categoriesList={categories}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default TeamCategories;
