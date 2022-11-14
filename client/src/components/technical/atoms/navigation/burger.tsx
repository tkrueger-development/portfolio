import React from 'react';

interface BurgerProps {
  isOpen?: boolean;
}

const initialState = {
  top:    'h-1 rounded-sm bg-gray-700 mb-1 ',
  mid:    'h-1 rounded-sm bg-gray-700 mb-1 ',
  bottom: 'h-1 rounded-sm bg-gray-700 ',
};

const openedState = {
  top:    initialState.top + 'rotate-45 translate-y-1',
  mid:    'hidden',
  bottom: initialState.bottom + '-rotate-45 -translate-y-1'
};

const Burger = ({ isOpen }: BurgerProps): JSX.Element => {

  const burgerClasses = {
    ...(!isOpen ? initialState : openedState)
  };

  return (
    <div className='h-full w-10'>
      <div className={'transition-transform ' + burgerClasses.top}></div>
      <div className={burgerClasses.mid}></div>
      <div className={'transition-transform ' + burgerClasses.bottom}></div>
    </div>
  );
};

export { Burger };