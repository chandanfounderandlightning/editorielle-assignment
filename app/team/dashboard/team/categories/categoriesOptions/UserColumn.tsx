"use client";
import { useState } from "react";
import { Button } from "@/common/components/atoms";
import lang from "@/common/lang";
import Dropdown from "@/common/designSystem/dropdown/dropdown";
import { usePostCategories } from "./usePostCategories";
import { Loader } from "@/common/designSystem";

const { generalDashboardHomeTeam } = lang;

type Props = {
  memberData: any;
  categoriesList: any;
  onCategorieChange: any;
};

const UserColumn: FC<Props> = ({
  memberData,
  categoriesList,
  onCategorieChange,
}: Props) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const getCategoriesData = usePostCategories();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const team_members = memberData.map((member: any) => ({
      user_id: member.id,
      categories: member.categories.map((category: any) => category.id),
    }));
    const payload = { team_members };
    getCategoriesData.submitForm(payload);
  };

  const saveButtonClasses = isDisabled
    ? "w-auto flex items-center justify-center bg-rose-200 text-black disabled:text-grey-500 rounded-md enabled:hover:bg-rose-400 disabled:bg-grey-50 disabled:cursor-not-allowed disabled:border disabled:border-grey-200 px-4 py-2 font-semibold text-sm"
    : "bg-rose-200 px-3 py-1.5 text-grey-900 font-bold text-sm border border-rose-200 rounded-md";

  return (
    <>
      {getCategoriesData.loader && <Loader />}
      <form noValidate onSubmit={handleSubmit}>
        <table className="table-auto text-left w-full rounded-t-lg">
          <thead className="border">
            <tr>
              <th className="px-4 py-2 border w-[20%]">Name</th>
              <th className="px-4 py-2 border w-[80%]">Categories</th>
            </tr>
          </thead>
          <tbody>
            {memberData &&
              memberData?.map((item: any, memberIndex: any) => {
                return (
                  <tr key={memberIndex}>
                    <td className="px-4 py-2 border w-[20%]">
                      {item.first_name}
                    </td>
                    <td className="px-4 py-2 border w-[20%]">
                      {item.categories &&
                        item.categories?.map((values: any, index: any) => (
                          <Dropdown
                            key={index}
                            selectedValue={values}
                            options={categoriesList}
                            allData={item.categories}
                            onChange={(option: number) =>
                              onCategorieChange(option, memberIndex, index)
                            }
                          />
                        ))}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="px-8 py-4 border rounded-b-lg ">
          <Button
            variant="solid"
            size="sm"
            className={saveButtonClasses}
            type="submit"
          >
            {generalDashboardHomeTeam.saveButton}
          </Button>
        </div>
      </form>
      {getCategoriesData.successMessage && (
        <div className="bg-green-400 p-2 mt-4 rounded">
          {getCategoriesData.successMessage}
        </div>
      )}
    </>
  );
};

export default UserColumn;
