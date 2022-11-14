import React from 'react';
import { useClassList } from '../../../../hooks/use-class-list';

interface ButtonProps {
  style?: object;
  className?: Array<string>;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const Button = ({ style = {}, className = [], disabled, onClick, children }: ButtonProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList('flex', 'justify-center', 'items-center', 'gap-x-1');

  appendClass(...className);

  return (
    <button style={style} className={getClassList()} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export { Button };