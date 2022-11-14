import React from 'react';
import { NavLink } from 'react-router-dom';

type hoverStyle = 'none' | 'border' | 'background';
type hoverStyleMap = Record<hoverStyle, Record<'initial' | 'active', string>>;

interface NavigationLinkProps {
 path: string;
 hoverStyle?: hoverStyle;
 className?: Array<string>;
 children?: React.ReactNode;
}

const hoverStyles: hoverStyleMap = {
  none: {
    initial: '',
    active: ''
  },
  border: {
    initial: 'border-b-2 border-solid border-transparent hover:border-teal-400 hover:text-teal-400 transition-colors duration-200',
    active: 'border-b-2 border-solid border-teal-400 text-teal-400'
  },
  background: {
    initial: 'hover:text-teal-400 transition-colors duration-200',
    active: 'text-teal-400'
  }
};

const NavigationLink = ({ path, hoverStyle = 'none', children }: NavigationLinkProps): JSX.Element => {
  const styles = hoverStyles[hoverStyle];

  const handleIsActive = ({ isActive }): string => {
    if (isActive) return styles.active;

    return styles.initial;
  };

  return (
    <NavLink className={handleIsActive} to={path}>
      {children}
    </NavLink>
  );
};

export { NavigationLink };