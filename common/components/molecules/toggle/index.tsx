import { Switch } from '@headlessui/react';
import { Toggle as PlainToggle } from '../../atoms/toggle';
import { MoleculeToggleProps } from './types';
export const Toggle = ({
  labelText = '',
  checked,
  onChange,
  customColor = 'rose-300',
  classes = '',
  ...props
}: MoleculeToggleProps) => {

  if (!labelText) return (
    <PlainToggle
      checked={checked}
      onChange={onChange}
      customColor={customColor}
    />
  )

  return (
    <Switch.Group data-cy={props["data-cy"]} as="div" className={`flex items-center ${classes}`}>
      <PlainToggle
        checked={checked}
        onChange={onChange}
        customColor={customColor}
      />
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-700">{labelText}</span>
      </Switch.Label>
    </Switch.Group>
  )
}

