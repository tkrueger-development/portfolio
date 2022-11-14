import React from 'react';
import { useClassList } from '../../../../hooks/use-class-list';

interface TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  center?: boolean;
  className?: Array<string>;
  children?: string;
}

const Heading = ({ as, center, className = [], children }: TextProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList('block', 'my-2');
  const Component = as || 'h1';

  appendClass(...className);

  if (center) appendClass('text-center');
 
  return (
    <Component className={getClassList()}>
      {children}
    </Component>
  );
};

export { Heading };