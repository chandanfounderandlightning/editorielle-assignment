import { Checkbox as PlainCheckbox } from "@/common/components/atoms";
import { CheckboxProps } from "./types";
import { Typography } from '@/common/components/atoms/typography';

export const Checkbox = ({
  name = '',
  id = '',
  label = '',
  error = false,
  errorMessage = '',
  ...rest
}: CheckboxProps) => {

  if (!label) return (
    <PlainCheckbox {...rest} />
  );

  return (
    <div>
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <PlainCheckbox id={id} error={error} {...rest} />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor={id}>
            {label}
          </label>
        </div>
      </div>
      {error && errorMessage && (
        <Typography
          classes="text-red-600"
          variant="span-xs"
          data-cy={`${name}-error`}
        >
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}
