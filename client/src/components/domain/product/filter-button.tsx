import React from 'react';

import { Button } from '../../technical/atoms/form/button';
import { Icon } from '../../technical/atoms/media/icon/icon';
import { Text } from '../../technical/atoms/typography/text';

import { AiOutlineFilter } from 'react-icons/ai';

interface FilterButtonProps {
  onClick?: () => void;
}

const FilterButton = ({ onClick }: FilterButtonProps): JSX.Element => {
  return (
    <Button 
      onClick={onClick}
      className={['w-full', 'py-2', 'bg-teal-400', 'text-white', 'font-semibold', 'rounded']}
    >
      <Icon className={['font-bold', 'text-white']} as={AiOutlineFilter} />
      <Text className={['font-bold']}>Filter</Text>
    </Button>
  );
};

export { FilterButton };