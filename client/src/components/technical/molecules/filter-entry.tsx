import React from 'react';

import { Checkbox } from '../atoms/form/checkbox';
import { Label } from '../atoms/form/label';

interface FilterEntryProps<C extends React.ElementType> {
  as?: C;
  name: string;
  checked?: boolean;
}

const FilterEntry = <C extends React.ElementType = 'div'>({ as, name, checked }: FilterEntryProps<C>): JSX.Element => {
  const Component = as || 'div';

  return (
    <Component className='flex gap-x-2'>
      <Checkbox id={name} value={name} checked={checked} />
      <Label labelFor={name}>{name}</Label>
    </Component>
  );
};

export { FilterEntry };