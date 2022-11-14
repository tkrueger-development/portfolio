import React from 'react';

import { LatestProductsSelection } from '../components/domain/product/latest-products-selection';
import { PopularProductsSelection } from '../components/domain/product/popular-products-selection';

const Home = () => {
  return (
    <>
      <LatestProductsSelection />
      <PopularProductsSelection />
    </>
  );
};

export { Home };