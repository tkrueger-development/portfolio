import React from 'react';
import { useClassList } from '../../../../../hooks/use-class-list';

interface ListProps {
  as?: 'ul' | 'ol';
  onChange?: (event: React.BaseSyntheticEvent) => void;
  className?: Array<string>;
  children?: React.ReactNode;
}

const List = ({ as, onChange, className = [], children }: ListProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList();
  const Component = as || 'ul';

  appendClass(...className);

  return (
    <Component className={getClassList()} onChange={onChange}> 
      {children}
    </Component>
  );
};

export { List };