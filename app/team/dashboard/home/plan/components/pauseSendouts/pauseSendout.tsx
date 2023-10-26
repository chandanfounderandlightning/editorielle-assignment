'use client';
import { Button } from "@/common/components/atoms";
import { Input } from "@/common/components/molecules";
import { Controller } from "react-hook-form";
import { Loader } from "@/common/designSystem";
import lang from "@/common/lang";
import { usePauseSendouts } from "./usePauseSendouts";

const { planDashboardHomeTeam } = lang;

const PauseSendoutsPlan = () => {
  const {
    isPauseSendoutDisabled, control, handleSubmit, onSubmit, dateString, Alert, isMutating,
  } = usePauseSendouts();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isMutating && <Loader />}
      <div className="p-8 border rounded-t-lg">
        <div className="flex">
          <Controller
            control={control}
            name="pauseTill"
            render={({
              field, fieldState,
            }) => {
              const { error } = fieldState;
              return (
                <Input
                  width="w-full"
                  id={field.name}
                  type="text"
                  data-cy="pauseTill"
                  min={dateString}
                  labelText="Pause sendouts"
                  placeholder={planDashboardHomeTeam.pauseDatePlaceholder}
                  error={!!error}
                  errorMessage={error?.message}
                  {...field}
                />
              );
            }}
          />
        </div>
      </div>
      <div className="px-8 py-4 border rounded-b-lg">
        <Button
          variant="solid"
          size="sm"
          disabled={isPauseSendoutDisabled}
          className={`px-3 py-1.5 text-sm rounded-md font-semibold ${isPauseSendoutDisabled === true ? 'text-grey-500 bg-grey-50 border border-grey-200' : 'text-grey-900 bg-rose-200 hover:bg-rose-300'}`}
          type="submit"
          data-cy="pauseSendout"
        >
          Pause sendouts
        </Button>
        <div className="text-left items-start">
          <Alert />
        </div>
      </div>
    </form>
  );
};

export default PauseSendoutsPlan;