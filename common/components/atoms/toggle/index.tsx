import { Switch } from '@headlessui/react'
import { ToggleProps } from './types';

function classNames (...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export const Toggle = ({
  checked, onChange, customColor = 'rose-300', ...props
}: ToggleProps) => {
  return (
    <Switch
      checked={checked}
      onChange={onChange}
      className={classNames(
        checked ? `bg-${customColor}` : 'bg-gray-200',
        `relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-${customColor} focus:ring-offset-2 align-bottom`,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={classNames(
          checked ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        )}
      />
    </Switch>
  )
}
