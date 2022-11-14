import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/domain/base/header';
import { Footer } from './components/domain/base/footer';

import { Home } from './pages/home';
import { KitesCategory } from './pages/kites-category';
import { BarsCategory } from './pages/bars-category';
import { BoardsCategory } from './pages/boards-category';
import { HarnessesCategory } from './pages/harnesses-category';
import { WetsuitsCategory } from './pages/wetsuits-category';

import { ProductDetail } from './pages/product-detail';

import { Text } from './components/technical/atoms/typography/text';

const App = () => {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <Header />
 
      <main className='mb-auto'>
        <Routes>
          <Route path='/'                    element={<Home />} />
          <Route path='/products/:productId' element={<ProductDetail />} />
          <Route path='/products/kites'      element={<KitesCategory />} />
          <Route path='/products/bars'       element={<BarsCategory />} />
          <Route path='/products/boards'     element={<BoardsCategory />} />
          <Route path='/products/harnesses'  element={<HarnessesCategory />} />
          <Route path='/products/wetsuits'   element={<WetsuitsCategory />} />
        </Routes>
      </main>

      <Footer 
        className={[
          'flex', 
          'flex-col', 
          'items-center', 
          'justify-center', 
          'h-20', 'py-10', 
          'bg-neutral-800'
        ]}>
        <Text block className={['text-neutral-500']}>wind x wave kitesurfing online shop</Text>
      </Footer>
    </div>
  );
};

export { App };