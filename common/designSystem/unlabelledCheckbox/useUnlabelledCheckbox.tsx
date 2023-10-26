'use client';
import './checkbox.scss';
import { useState } from 'react';
import { CheckboxTick } from '@/common/components/icons';

type CheckboxProps = {
  id: string;
}
const useUnlabelledCheckbox = (initialState = false) => {
  const [isChecked, setIsChecked] = useState<boolean>(initialState);

  const UnlabelledCheckbox = ({ id }: CheckboxProps) => {
    return (
      <button className={`custom-checkbox ${isChecked ? 'checked' : ''}`} id={id} type="button" onClick={() => setIsChecked(!isChecked)}>
        {isChecked && <CheckboxTick width={10} height={10} />}
      </button>
    );
  };

  return {
    isChecked,
    UnlabelledCheckbox,
  };
};

export default useUnlabelledCheckbox;
