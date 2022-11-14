import React from 'react';
import { useClassList } from '../../../../hooks/use-class-list';

interface StackProps {
  className?: Array<string>;
  children?: React.ReactNode;
}

const Stack = ({ className = [], children }: StackProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList('flex', 'flex-col');

  appendClass(...className);

  return (
    <div className={getClassList()}>
      {children}
    </div>
  );
};

export { Stack };