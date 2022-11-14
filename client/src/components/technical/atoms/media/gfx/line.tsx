import React from 'react';
import { useClassList } from '../../../../../hooks/use-class-list';

interface LineProps {
  className?: Array<string>;
}

const Line = ({ className = [] }: LineProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList('h-px', 'w-full', 'bg-slate-300');

  appendClass(...className);

  return <div className={getClassList()}></div>;
};

export { Line };