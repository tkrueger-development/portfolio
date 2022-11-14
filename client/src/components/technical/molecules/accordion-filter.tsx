import React, { useState } from 'react';

import { FilterEntry } from './filter-entry';

import { Chevron }  from '../atoms/media/gfx/chevron';
import { Line }     from '../atoms/media/gfx/line';
import { Button }   from '../atoms/form/button';
import { Box }      from '../atoms/display/box';
import { List }     from '../atoms/layout/list/list';
import { Text }     from '../atoms/typography/text';

interface AccordionFilterProps {
  label: string;
  open?: boolean;
  filterOptions: Array<string>;
  activeFilters: Array<string>;
  update: (filterName: string) => void;
}

const AccordionFilter = ({ label, open = false, filterOptions = [], activeFilters = [], update }: AccordionFilterProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(open);

  const chevronDirection = () => isOpen ? 'up' : 'down';
  const toggleOpen       = () => { setIsOpen((prevState) => !prevState); };

  const handleChange = ({ target }) => {
    update(target.value);
  };

  return (
    <Box className={['px-6', 'py-4', 'rounded-md', 'bg-white', 'shadow-md']}>

      <Button onClick={toggleOpen} className={['flex', 'justify-between', 'items-center', 'w-full', 'pr-1.5']}>
        <Text className={['font-semibold']}>{label}</Text>
        <Chevron orientation={chevronDirection()} />
      </Button>

      {isOpen &&
      <>
        <Line className={['my-4']} />
        <List onChange={handleChange}>
          {filterOptions.map((title) => {
            const checked = activeFilters.includes(title);

            return <FilterEntry as='li' key={title} name={title} checked={checked} />;
          })}
        </List>
      </>}

    </Box>
  );
};

export { AccordionFilter };