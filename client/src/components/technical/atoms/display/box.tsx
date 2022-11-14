import React from 'react';
import { useClassList } from '../../../../hooks/use-class-list';

interface BoxProps {
  rounded?: boolean;
  shadow?: boolean;

  className?: Array<string>;
  children?: React.ReactNode;
}

const Box = ({ className = [], rounded, shadow, children }: BoxProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList();

  appendClass(...className);
  
  if (rounded) appendClass('rounded-sm');
  if (shadow) appendClass('shadow-md');

  return (
    <div className={getClassList()}>
      {children}
    </div>
  );
};

export { Box };