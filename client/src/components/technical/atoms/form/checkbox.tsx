import React from 'react';
interface CheckboxProps {
  id: string;
  value: string;
  checked?: boolean;
}

const Checkbox = ({ id, value, checked = false }: CheckboxProps): JSX.Element => {
  return (
    <input 
      id={id} 
      readOnly
      type='checkbox'
      className='cursor-pointer accent-teal-400'
      value={value}
      checked={checked}
    />
  );
};

export { Checkbox }; 