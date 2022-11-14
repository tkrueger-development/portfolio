import React from 'react';
import { useClassList } from '../../../../../hooks/use-class-list';

type ChevronOrientation = 'up' | 'right' | 'down' | 'left';
interface ChevronProps {
  orientation?: ChevronOrientation;
}

const chevronOrientation: Record<ChevronOrientation, string> = {
  up: '-rotate-45',
  right: 'left-0 rotate-45',
  down: 'top-0 rotate-135',
  left: 'left-2 -rotate-135',
};


// TODO: Pseudo class?
const Chevron = ({ orientation = 'up' }: ChevronProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList('border-solid', 'border-t-2', 'border-r-2', 'border-slate-600', 'inline-block', 'relative', 'h-2', 'w-2', 'left-1', 'right-1');
  
  appendClass(chevronOrientation[orientation]);

  return (
    <span className={getClassList()}></span>
  );
};

export { Chevron };