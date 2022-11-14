import React, { useState } from 'react';

import { Chevron } from '../atoms/media/gfx/chevron';
import { Line } from '../atoms/media/gfx/line';
import { Checkbox } from '../atoms/form/checkbox';
import { Rating } from './rating';
import { Text } from '../atoms/typography/text';
import { Label } from '../atoms/form/label';
import { List } from '../atoms/layout/list/list'; 

interface RatingFilterProps {
  label: string;
  activeFilter: number;
  update: (value: number) => void;
}


const options = [1, 2, 3, 4, 5];
const labels  = ['oneStar', 'twoStars', 'threeStars', 'fourStars', 'fiveStars'];

const chevronDir = (isOpen: boolean): 'up' | 'down' => isOpen ? 'up' : 'down';

const RatingFilter = ({ label, activeFilter, update }: RatingFilterProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen   = () => { setIsOpen((prevState) => !prevState); };
  const handleChange = ({ target }: React.BaseSyntheticEvent): void => { update(parseInt(target.value)); };

  return (
    <div className='w-full px-6 py-4 rounded-md bg-white shadow-md'>

      <button 
        onClick={toggleOpen}
        className='flex justify-between items-center w-full pr-1.5'
      >
        <Text className={['font-semibold']}>{label}</Text>
        <Chevron orientation={chevronDir(isOpen)} />
      </button>

      {isOpen &&
      <>
        <Line className={['my-4']} />
        <List onChange={handleChange}>
          {options.map((filter, index) => {
            const id = labels[index];
            const checked = activeFilter === filter;

            return (
              <div className='flex gap-x-2' key={labels[index]}>
                <Checkbox key={filter} id={id} value={filter.toString()} checked={checked} />
                <Label labelFor={id}><Rating score={filter} /></Label>
              </div>
            );
          })}
        </List>
      </>
      }

    </div>
  );
};

export { RatingFilter };