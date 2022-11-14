import React from 'react';

import { ProductCard } from './product-card';
import { List } from '../../technical/atoms/layout/list/list';
import { ListItem } from '../../technical/atoms/layout/list/list-item';
import { ProductOverviewDTO } from '../../../../../common/dtos/product-dtos';

interface ProductGridProps {
  products: Array<ProductOverviewDTO>;
}

const ProductGrid = ({ products = [] }: ProductGridProps): JSX.Element => {
  return (
    <List className={[
      'items-start',
      'w-full',
      'my-10',

      'grid',
      'grid-cols-productGrid', // custom class in tailwind.config.cjs
      'gap-4'
    ]}>

      {products.map(({ id, brand, name, category, imagePath, ratingAverage, variants }) => {
        return (
          <ListItem key={id}>
            <ProductCard
              id              = {id}
              brand           = {brand}
              name            = {name}
              category        = {category}
              imagePath       = {imagePath}
              ratingAverage   = {ratingAverage}
              variants        = {variants}
            />
          </ListItem>
        );
      })}

    </List>
  );
};

export { ProductGrid };