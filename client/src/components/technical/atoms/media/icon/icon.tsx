import React from 'react';
import { useClassList } from '../../../../../hooks/use-class-list';

interface IconProps<C extends React.ElementType> {
  as?: C;
  className?: Array<string>;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl';
}

const Icon = <C extends React.ElementType = 'span'>({ as, className = [] }: IconProps<C>): JSX.Element => {
  const Component = as || 'span';
  const [getClassList, appendClass] = useClassList('text-2xl');

  appendClass(...className);

  return (
    <div className={getClassList()}>
      <Component />
    </div>
  );
};

export { Icon };