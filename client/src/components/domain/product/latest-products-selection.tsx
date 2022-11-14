import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLatestProducts } from '../../../api/wind-and-wave';

import { ProductSpotlight } from './product-spotlight';

const headline = 'new products';
const subline  = 'Checkout our latest additions.';

const LatestProductsSelection = () => {
  const { data, isError, error, isLoading } = useQuery(['latest-products'], fetchLatestProducts);

  return (
    <section>
      {isLoading && <h2>Loading..</h2>}
      {isError   && <h2>Error: {(error as Error).message}</h2>}

      {!isLoading && !isError && 
      <ProductSpotlight 
        products={data || []} 
        headline={headline} 
        subline={subline}
      />}

    </section>
  );
};

export { LatestProductsSelection };