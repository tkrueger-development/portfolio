import React from 'react';

import { ProductOverviewDTO } from '../../../../../common/dtos/product-dtos';

import { Container } from '../../technical/atoms/layout/container';
import { Stack } from '../../technical/atoms/layout/stack';
import { Heading } from '../../technical/atoms/typography/heading';
import { GradientHeading } from '../../technical/atoms/typography/gradient-heading';
import { ProductGrid } from './product-grid';


interface ProductGridProps {
  headline?: string;
  subline?: string;
  products: Array<ProductOverviewDTO>;
}

const ProductSpotlight = ({ headline, subline, products }: ProductGridProps): JSX.Element => {
  return (
    <Container center>
      <Stack className={['flex-grow', 'mx-auto', 'gap-x-5']}>
        <Heading 
          as='h2'
          center
          className={[
            'text-base',
            'text-neutral-700',
            'font-semibold',
            'mt-10',
            'mb-2'
          ]}>
          {headline}
        </Heading>

        <GradientHeading 
          as='h3'
          center
          className={[
            'text-3xl',
            'font-weight-900',
            'text-center',
            'mt-1',
            'mb-14',

            'sm:text-3xl',

            'md:text-4xl',
            'md:mt-1',
          ]}>
          {subline}
        </GradientHeading>

        <ProductGrid products={products} />

      </Stack>
    </Container>
  );
};

export { ProductSpotlight };