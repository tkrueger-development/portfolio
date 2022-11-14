import React from 'react';
import { useClassList } from '../../../../hooks/use-class-list';
interface TextProps {
  block?: boolean;
  uppercase?: boolean;

  className?: Array<string>;
  children?: React.ReactNode;
}

const Text = ({ block = false, uppercase, className = [], children }: TextProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList(); // 'text-center'

  if (block) appendClass('block');
  if (uppercase) appendClass('uppercase');

  if (className.length > 0) appendClass(...className);

  return (
    <span className={getClassList()}>
      {children}
    </span>
  );
};

export { Text };