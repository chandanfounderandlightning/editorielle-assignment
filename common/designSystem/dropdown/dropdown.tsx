import React, { useState } from "react";
import DropDownIcon from "@/assets/icons/dropdown_icon.svg";
import "./dropdown.scss";

type CategoriesType = {
  options: Options;
};

type AllDataType = {
  id: number;
  categories: Options[];
  email: string;
  first_name: string;
  last_name: string;
};

type Options = {
  id: number;
  name: string;
};

const Dropdown = ({
  options,
  selectedValue,
  onChange,
  allData,
}: {
  options: CategoriesType[];
  selectedValue: Options;
  onChange: any;
  allData: AllDataType[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Object) => {
    onChange(option);
    setIsOpen(!isOpen);
  };

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  });

  const selectedCategories = allData.map(
    (selectedCategory: any) => selectedCategory.id
  );

  const getOptionList = (selectedOption: Options) =>
    options.filter((option: any) => {
      return (
        !selectedCategories.includes(option.id) ||
        option.id === selectedOption.id
      );
    });

  return (
    <div className="dropdown mx-2 my-2">
      <div
        onClick={toggleDropdown}
        className="relative border w-[160px] cursor-default rounded-lg bg-white py-1.5 pl-3 pr-3 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <div className="flex justify-between">
          <span>{selectedValue.name}</span>
          <span>
            <DropDownIcon className="w-5" />
          </span>
        </div>
      </div>
      {isOpen && (
        <ul className="dropdown-menu w-full z-10">
          {getOptionList(selectedValue).map((list: any, index: any) => {
            return (
              <li
                key={index}
                onClick={() => handleOptionClick(list)}
                className="hover:bg-[#fecdd3]"
              >
                {list.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
