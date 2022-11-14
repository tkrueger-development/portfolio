import React from 'react';

import { useClassList } from '../../../../hooks/use-class-list';

interface GroupProps {
  className?: Array<string>;
  children?: React.ReactNode;
}

const Group = ({ className = [], children }: GroupProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList('flex');

  appendClass(...className);

  return (
    <div className={getClassList()}>
      {children}
    </div>
  );
};

export { Group };
