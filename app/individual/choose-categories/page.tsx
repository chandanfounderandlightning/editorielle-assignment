'use client';
import React from 'react';
import { Button } from "@/common/components/atoms";
import { Typography } from "@/common/components/atoms/typography";
import {
  ContentLayout, Loader,
} from "@/common/designSystem";
import lang from "@/common/lang";
import UserGroup from "@/stories/assets/user-group.svg";
import SquarePlus from "@/stories/assets/squares-plus.svg";
import { useRouter } from 'next/navigation';
import {
  useChooseCategories,
} from './useChooseCategories';
import ErrorModal from '@/common/components/atoms/modal/error';
import { individual } from '@/common/utils/network/endpoints';
import { Item } from './types';

const {
  individualChooseCategories,
} = lang;
const {
  addTeamMemberUrlFE,
} = individual;

const ChooseCategories = () => {
  const router = useRouter();

  const {
    Alert,
    categories,
    preSelectedCategories,
    handleToggle,
    price,
    handleSubmit,
    register,
    onSubmit,
    isLoading,
    isModalOpen,
    setModalOpen,
    errorModalData,
  } = useChooseCategories();

  return (
    <ContentLayout>
      <form className="flex items-center flex-col md:flex-row py-3 lg:px-[48px] lg:py-[48px] xl:px-[80px] xl:py-[48px] mt-0 lg:mt-[9vh]" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full md:w-2/3">
          <Typography variant="heading-md" classes="font-bold text-grey-900 text-center lg:text-left xl:text-left">
            {individualChooseCategories.header}
          </Typography>
          <Typography variant="body-sm" classes="font-medium text-grey-700 mt-3 text-center lg:text-left xl:text-left w-full lg:w-[60%] mb-10">
            {individualChooseCategories.bodyText}<br className="hidden lg:block" /> {individualChooseCategories.bodyText1}
          </Typography>
          <div className="flex flex-wrap w-full lg:w-1/2 overflow-y-auto max-h-[40vh] pb-[50%] mdsm:pb-[10%] md:pb-0">
            <input type="hidden" {...register('categories')} />
            {isModalOpen === false && isLoading && <Loader />}
            {categories.map((category:any) => (
              <div key={category.id} className="w-1/2 lg:w-1/3 p-1.5 pl-0 pr-3 items-start">
                <Button
                  onClick={() => handleToggle(category)}
                  className={`border font-semibold text-sm rounded-md px-2 py-2 w-full ${preSelectedCategories.find((el: any) => el.category_id === category.id)  ? 'bg-grey-400 text-grey-50 border-grey-300' : 'bg-white text-grey-600 border-grey-300 hover:bg-grey-50 hover:text-grey-900'}`}
                  type='button'
                  size='sm'
                  variant='solid'
                  width='w-full'
                >
                  {category.name}
                </Button>
              </div>
            ))}
          </div>
          <div className="flex space-x-4 mt-10 hidden lg:block">
            <Button
              type="button"
              variant="solid"
              size="sm"
              data-cy="back"
              width="w-[12%]"
              className="border border-grey-300 rounded py-1.5 px-3 w-24 bg-white text-grey-600 font-semibold hover:bg-grey-50 hover:text-grey-900"
              onClick={() => router.push(addTeamMemberUrlFE)}
            >
              {individualChooseCategories.backButton}
            </Button>
            <Button
              type="submit"
              variant="solid"
              size="sm"
              data-cy="payment"
              width="w-[12%]"
              className="border border-rose-200 rounded py-1.5 px-3 w-52 bg-rose-200 text-grey-900 hover:bg-rose-300 font-semibold"
            >
              {individualChooseCategories.paymentButton}
            </Button>
            <Alert />
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 lg:pl-24 lg:relative md:relative fixed bottom-0 left-0 right-0 mdsm:static md:static lg:static bg-white lg:bg-transparent shadow-md lg:shadow-none mdsm:py-0 mdsm:mt-10 md:py-3 lg:py-0">
          <div className="rounded-xl p-6 lg:p-8 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.06)] border-0">
            <Typography variant="heading-md" classes="font-semibold text-grey-900 hidden lg:block text-xl leading-7">
              {individualChooseCategories.priceHeader}
            </Typography>
            <Typography variant="body-sm" classes="font-normal lg:mt-3 hidden lg:block text-grey-700">
              {individualChooseCategories.priceBody}
            </Typography>
            <div className="flex border rounded-md mt-0 lg:mt-8 items-center justify-center h-12 text-grey-300 border-solid">
              <div className="bg-red-200 p-3 rounded-l-md">
                <UserGroup className="h-6 w-6 pl-0.5" />
              </div>
              <div className="flex-grow pl-2">
                <Typography variant="body-sm" classes="font-normal text-grey-700 text-xs">
                  {individualChooseCategories.memberCountText}
                </Typography>
              </div>
              <div className="pl-2 pr-4">
                <Typography variant="body-md" classes="font-semibold text-grey-900">
                  {individualChooseCategories.memberCount}
                </Typography>
              </div>
            </div>
            <div className="flex border rounded-md mt-3 lg:mt-8 items-center justify-center h-12 text-grey-300 border-solid">
              <div className="bg-red-200 p-3 rounded-l-md">
                <SquarePlus className="h-6 w-6 pl-0.5" />
              </div>
              <div className="flex-grow pl-2">
                <Typography variant="body-sm" classes="font-normal text-grey-700 text-xs">
                  {individualChooseCategories.categoryText}
                </Typography>
              </div>
              <div className="pl-2 pr-4">
                <Typography variant="body-md" classes="font-semibold text-grey-900">
                  {preSelectedCategories.length}x
                </Typography>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex-shrink mr-2">
                <div className="mt-3 lg:mt-8">
                  <Typography variant="body-md" classes="hidden lg:block text-base font-bold text-grey-900 pl-2 mt-2.5">
                    {individualChooseCategories.total}
                    <span className="font-bold">£{price}/month</span>
                    <span className="text-xs font-normal">{individualChooseCategories.vat}</span>
                  </Typography>
                  <Typography variant="body-md" classes="block lg:hidden text-base font-bold text-grey-900 pl-2 mt-2.5">
                    {individualChooseCategories.total}
                    <span className="font-bold">£{price}/month</span><br />
                    <span className="text-xs font-normal">{individualChooseCategories.vat}</span>
                  </Typography>
                </div>
              </div>
            </div>
            <div className="mt-6 flex-none lg:flex-grow block lg:hidden">
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="solid"
                  size="md"
                  data-cy="back"
                  className="border text-grey-600 rounded p-2 bg-white text-black mr-2 flex-grow font-semibold"
                  onClick={() => router.push('/individual/add-team-member')}
                >
                  {individualChooseCategories.backButton}
                </Button>
                <Button
                  type="submit"
                  variant="solid"
                  size="sm"
                  data-cy="payment"
                  className="border border-rose-200 rounded p-2 bg-rose-200 text-grey-900 hover:bg-rose-300 flex-grow font-semibold"
                >
                  {individualChooseCategories.nextButton}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form> 
      <ErrorModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        heading={errorModalData.heading}
        bodyText={errorModalData.bodyText}
        buttonText={errorModalData.buttonText}
        secondButtonText={errorModalData.secondButtonText}
        buttonLink={errorModalData.buttonLink}
        secondButtonLink={errorModalData.secondButtonLink}
      />
    </ContentLayout>
  );
};

export default ChooseCategories;
