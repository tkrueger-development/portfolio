import React from 'react';
import { useQuery } from '@tanstack/react-query';
import{ fetchPopularProducts} from '../../../api/wind-and-wave';

import { ProductSpotlight } from './product-spotlight';

const headline = 'popular products';
const subline = 'See what others chose.';

const PopularProductsSelection = () => {
  const { data, isError, error, isLoading } = useQuery(['popular-products'], fetchPopularProducts);

  return (
    <>
      {isLoading && <h2>Loading..</h2>}
      {isError && <h2>Error: {(error as Error).message}</h2>}

      {!isLoading && !isError && 
      <ProductSpotlight
        products={data} 
        headline={headline} 
        subline={subline}
      />}
    </>
  );
};

export { PopularProductsSelection };