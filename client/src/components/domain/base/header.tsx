import React, { useState } from 'react';

import { Text } from '../../technical/atoms/typography/text';
import { Button } from '../../technical/atoms/form/button';
import { Box } from '../../technical/atoms/display/box';
import { Container } from '../../technical/atoms/layout/container';
import { List } from '../../technical/atoms/layout/list/list';
import { ListItem } from '../../technical/atoms/layout/list/list-item';
import { Logo } from '../../technical/atoms/media/image/logo';
import { NavigationLink } from '../../technical/atoms/navigation/navigation-link';
import { Burger } from '../../technical/atoms/navigation/burger';


// import { AiOutlineYoutube } from 'react-icons/ai';
// import { AiOutlineFacebook } from 'react-icons/ai';
// import { AiOutlineInstagram } from 'react-icons/ai';
// import { AiOutlineUser } from 'react-icons/ai';
// import { AiOutlineShopping } from 'react-icons/ai';

const categories = [
  { name: 'Kites',     path: '/products/kites' },
  { name: 'Bars',      path: '/products/bars' },
  { name: 'Boards',    path: '/products/boards' },
  { name: 'Harnesses', path: '/products/harnesses' },
  { name: 'Wetsuits',  path: '/products/wetsuits' },
];

const Header = () => {
  const [burgerMenuIsOpen, setBurgerMenuIsOpen] = useState(false);

  const closeBurgerMenu = () => { setBurgerMenuIsOpen(false); };
  const toggleBurgerMenu = () => { setBurgerMenuIsOpen((prevState) => !prevState); };

  return (
    <header>
      <Box shadow className={['py-4']}>
        <Container center>
          <NavigationLink path='/'>
            <Logo
              className={['w-24']}
              alt='Logo'
              src='./assets/windandwave_logo_01-dark.png'
            />
          </NavigationLink>

          <Button 
            aria-label='mobile menu' 
            className={['inline-block md:hidden']} 
            onClick={toggleBurgerMenu}
          >
            <Burger isOpen={burgerMenuIsOpen} />
          </Button>

          <nav className='hidden md:block'>
            <List className={['flex', 'gap-x-14']}>
              {categories.map(({ name, path }, index) => {
                return (
                  <NavigationLink hoverStyle='border' key={index} path={path}>
                    <ListItem className={['text-center', 'py-4']}><Text uppercase className={['font-semibold']}>{name}</Text></ListItem>
                  </NavigationLink>
                );
              })}
            </List>
          </nav>
        </Container>
      </Box>

      {burgerMenuIsOpen && 
        <nav className='relative' onClick={closeBurgerMenu}>
          <List className={[
            'absolute', 
            'w-full',
            'min-h-screen',
            'flex-col', 
            'shadow-lg', 
            'bg-white',
            'z-10',
            'mt-1'
          ]}>

            {categories.map(({ name, path }) => {
              return (
                <NavigationLink hoverStyle='background' key={name} path={path}>
                  <li className='text-center py-4'><Text uppercase className={['font-semibold']}>{name}</Text></li>
                </NavigationLink>
              );
            })}
            
          </List>
        </nav>
      }
    </header>
  );
};

export { Header };