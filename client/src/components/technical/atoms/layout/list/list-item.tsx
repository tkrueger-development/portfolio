import React from 'react';
import { useClassList } from '../../../../../hooks/use-class-list';
interface ListItemProps {
  className?: Array<string>;
  children?: React.ReactNode;
}

const ListItem = ({ className = [], children, ...rest }: ListItemProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList();

  appendClass(...className);

  return (
    <li className={getClassList()} {...rest}>
      {children}
    </li>
  );
};

export { ListItem };