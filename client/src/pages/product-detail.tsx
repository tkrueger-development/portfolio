import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { fetchProductById } from '../api/wind-and-wave';
import { Product } from '../types/product';

import { Container } from '../components/technical/atoms/layout/container';
import { Rating } from '../components/technical/molecules/rating';
import { Text } from '../components/technical/atoms/typography/text';
import { Group } from '../components/technical/atoms/layout/group';
import { ProductImage } from '../components/domain/product/product-image';
import { ProductDetailImage } from '../components/domain/product/product-detail-image';
import { Stack } from '../components/technical/atoms/layout/stack';
import { Box } from '../components/technical/atoms/display/box';
import { Heading } from '../components/technical/atoms/typography/heading';
import { Line } from '../components/technical/atoms/media/gfx/line';
import { List } from '../components/technical/atoms/layout/list/list';
import { ListItem } from '../components/technical/atoms/layout/list/list-item';
import { Button } from '../components/technical/atoms/form/button';

const ProductDetail = (): JSX.Element => {
  const { productId } = useParams();
  const [ product, setProduct ] = useState<Product | null>(null);

  const [ imageColorMapping, setImageColorMapping] = useState<Record<string, string>>({});

  const [ activeSize, setActiveSize ] = useState<string | null>(null);
  const [ activeColor, setActiveColor ] = useState<string | null>(null);

  const { isError, error, isLoading } = useQuery(['product-detail', productId], () => fetchProductById({ id: productId }), {
    refetchOnWindowFocus: false,
    onSuccess: (data) => { 
      setProduct((prevProduct) => {
        if (prevProduct) return prevProduct;
        
        const product = new Product(data);

        const firstVariant = product.variants[0];
        if (firstVariant.size) setActiveSize(firstVariant.size);
        if (firstVariant.color) setActiveColor(firstVariant.color);

        const map: Record<string, string> = {};
        product.variants.forEach(({ image, color }) => {
          if (!map[image]) map[image] = color;
        });

        setImageColorMapping(map);

        return product;
    });
  }});

  if (isLoading || !product) return <span>Loading..</span>;

  const productVariant = product.getVariantByConfig({ color: activeColor, size: activeSize });
  
  const { image, price } = productVariant;
  const { brand, description, imageGallery, imagePath, name, ratingAverage } = product;
  
  const articleName = `${brand} ${name}`;
  const fullImagePath = '/assets/products/' + imagePath;

  return (
    <Container center>
      {isError && <span>{(error as Error).message}</span>}

      {!isLoading && !isError &&

       <Box className={['my-20', 'mx-auto']}>
        <Group className={['flex-col', 'md:flex-row' ,'md:justify-around', 'gap-x-8']}>

          <Stack className={['gap-y-14']}>
            <ProductDetailImage src={fullImagePath + image} alt={articleName} />
            <Group className={['justify-center', 'gap-x-8', 'mb-20', 'md:mb-0:justify-around']}>
              {product.hasMultiplePhotos() && imageGallery.map((image) => {
              return (
                <Button 
                  key={image}
                  onClick={() => setActiveColor(imageColorMapping[image]) }
                >
                  <ProductImage shadow src={fullImagePath + image} alt={articleName} />
                </Button>
              );
            })}
            </Group>
          </Stack>

          <Stack className={['items-center', 'md:items-start']}>
            <Heading as='h1' className={['text-center', 'md:text-left', 'text-3xl', 'font-bold', 'text-neutral-800']}>{articleName}</Heading>
            <Text className={['text-xl', 'mb-6']}><Rating className={['text-center', 'md:text-left']} withLabel score={ratingAverage}></Rating></Text>
            <Text className={['font-semibold', 'text-neutral-600', 'text-3xl', 'text-start']}>{price}€</Text>
            <Line className={['w-11/12', 'md:w-full', 'mt-6', 'mb-10']} />
            <Stack className={['gap-y-10']}>

              {product.hasMultipleColors() &&
              <Stack className={['items-center', 'md:items-start', 'gap-y-4']}>
                <Heading as='h3' className={['text-lg', 'font-semibold']}>Color</Heading>
                <List className={['flex', 'flex-wrap', 'gap-x-3']}>
                    {product.getColors().map((color) => {
                      const style = {
                        backgroundColor: color,
                        boxShadow: color === activeColor ? '0px 0px 2px 3px rgb(45 212 191)' : ''
                      };
 
                      return (
                        <ListItem key={color}>
                          <Button 
                            style={style} 
                            className={['w-7', 'h-7', 'rounded-full', 'border-[1px]', 'border-neutral-900']}
                            onClick={() => setActiveColor(color) }
                          />
                        </ListItem>
                      );
                    })}
                </List>
              </Stack>}

              {product.hasMultipleSizes() &&
              <Stack className={['items-center', 'md:items-start', 'gap-y-4']}>
                <Heading as='h3' className={['text-lg', 'font-semibold']}>Size</Heading>
                  <List className={['flex', 'flex-wrap', 'gap-2', 'px-6', 'md:px-0', 'md:w-96']}>
                    {product.getSizes().map((size) => {

                        const isActive = size === activeSize;

                        const style = {
                          color: isActive ? '#ffffff' : 'rgb(38 38 38)',
                          backgroundColor: isActive ? 'rgb(45 212 191)' : 'rgb(229 229 229)',
                        };

                      return (
                        <ListItem key={size}>
                          <Button
                            style={style}
                            onClick={() => setActiveSize(size) }
                            className={['px-4 h-8 rounded-lg bg-neutral-200 text-center text-neutral-800 font-semibold']}
                          >
                            {size}
                          </Button>
                        </ListItem>
                      );
                    })}
                  </List>
              </Stack>
              }

              <Stack className={['mt-10', 'items-center', 'md:items-start']}>
                <Text className={['font-semibold', 'text-sm', 'text-teal-400', 'text-left']}>Delivery 2-5 days.</Text>
                <Text className={['text-sm', 'text-neutral-400', 'text-left']}>Inclusive tax, exclusive shipping.</Text>
                <Button disabled className={['px-4', 'py-2', 'mt-3', 'rounded-md', 'bg-neutral-300', 'text-white', 'font-semibold w-40']}>Add to Cart</Button>
              </Stack>

            </Stack>
          </Stack>
        </Group>
        <Heading as='h3' className={['text-lg', 'font-semibold', 'text-neutral-900', 'mt-14', 'mb-4']}>Description</Heading>
        <Text className={['text-neutral-700']}>{description}</Text>
      </Box>
      }
    </Container>
  );
};

export { ProductDetail };