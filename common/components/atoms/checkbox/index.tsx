import { CheckboxProps } from './types';
export const Checkbox = ({
  id = 'checkbox-id',
  name = 'checkbox-name',
  ariaDescribedBy = 'checkbox-aria-description',
  checked = false,
  onChange = () => null,
  onBlur = () => null,
  error = false,
  ...rest
}: CheckboxProps) => {
  const ring = error ? 'ring-2 ring-red-500 ring-offset-2' : '';
  return (
    <div className="flex h-6 items-center">
      <input
        id={id}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        aria-describedby={ariaDescribedBy}
        name={name}
        type="checkbox"
        className={`h-4 w-4 rounded border-gray-300 text-rose-300 focus:ring-rose-400 ${ring}`}
        {...rest}
      />
    </div>
  );
};

