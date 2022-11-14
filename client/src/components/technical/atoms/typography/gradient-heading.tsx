import React from 'react';
import { useClassList } from '../../../../hooks/use-class-list';

interface GradientHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  center?: boolean;
  children?: string;
  className?: Array<string>;
}

const GradientHeading = ({ as, center, className = [], children }: GradientHeadingProps): JSX.Element => {
  const Component = as || 'h2';
  const [getClassList, appendClass] = useClassList('font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-300');

  appendClass(...className);

  if (center) appendClass('text-center');

  return (
    <Component className={getClassList()}>
      {children}
    </Component>
  );
};

export { GradientHeading };