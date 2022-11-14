import React from 'react';
import { useClassList } from '../../../hooks/use-class-list';
interface FooterProps {
  className?: Array<string>;
  children?: React.ReactNode;
}

const Footer = ({ className = [], children }: FooterProps) => {
  const [getClassList, appendClass] = useClassList();

  appendClass(...className);

  return (
    <footer className={getClassList()}>
      {children}
    </footer>
  );
};

export { Footer };