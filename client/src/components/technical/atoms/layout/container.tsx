import React from 'react';
import { useClassList } from '../../../../hooks/use-class-list';

interface ContainerProps {
  center?: boolean;
  className?: Array<string>;
  children?: React.ReactNode;
}

const localStyles = 'flex items-center justify-between px-5 max-w-7xl';

const Container = ({ center, className = [], children }: ContainerProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList();

  if (center)    appendClass('mx-auto');
  if (className) appendClass(...className);

  appendClass(localStyles);

  return (
    <div className={getClassList()}>
      {children}
    </div>
  );
};

export { Container };