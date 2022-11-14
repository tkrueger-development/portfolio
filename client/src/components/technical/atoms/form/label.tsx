import React from 'react';

interface LabelProps {
  labelFor?: string;
  children?: React.ReactNode;
}

const Label = ({ labelFor, children }: LabelProps): JSX.Element => {
  return (
    <label htmlFor={labelFor} className='text-sm cursor-pointer'>{children}</label>
  );
};

export { Label };