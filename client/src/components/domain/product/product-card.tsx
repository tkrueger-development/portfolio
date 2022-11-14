import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Box } from '../../technical/atoms/display/box';
import { Button } from '../../technical/atoms/form/button';
import { ProductImage } from './product-image';
import { NavigationLink } from '../../technical/atoms/navigation/navigation-link';
import { Stack } from '../../technical/atoms/layout/stack';
import { Rating } from '../../technical/molecules/rating';
import { Text } from '../../technical/atoms/typography/text';
import { Group } from '../../technical/atoms/layout/group';
import { ProductOverviewDTO } from '../../../../../common/dtos/product-dtos';

const ProductCard = ({ id, brand, imagePath, ratingAverage, name, variants }: Omit<ProductOverviewDTO, 'createdOn'> & { id: string }): JSX.Element => {
  const price = variants[0].price;
  const path = '/products/' + id;
  const imageURI = '/assets/products/' + imagePath + variants[0].image;

  const navigate = useNavigate();

  return (
    <Box shadow
      className={[
        'p-4',
        'rounded-md',
      ]}>

      <NavigationLink path={path}>
        <ProductImage
          shadow
          alt={name}
          src={imageURI} 
        />
      </NavigationLink>

      <Stack className={['gap-y-3', 'mt-4']}>
        <Rating withLabel score={ratingAverage} className={['justify-center']} />

        <Stack className={['gap-px']}>
          <Text className={['text-base', 'text-center']}>{brand}</Text>
          <Text className={['font-semibold', 'text-lg', 'whitespace-nowrap', 'text-center']}>{name}</Text>
          <Group className={['justify-center', 'items-center', 'gap-x-1']}>
            <Text className={['text-sm']}>starting</Text><Text className={['text-base']}>{price}€</Text>
          </Group>
        </Stack>

        <Button onClick={() => navigate(path)} className={['bg-teal-400', 'py-1.5', 'w-full' ,'rounded']}>
          <Text className={['text-white', 'font-semibold']}>Details</Text>
        </Button>
      </Stack>
    </Box>
  );
};

export { ProductCard };