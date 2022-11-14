import React from 'react';
import { Image } from '../../technical/atoms/media/image/image';

interface ProductImageProps {
  src: string;
  alt: string;
  shadow?: boolean;
}

const ProductImage = ({ src, alt, shadow }: ProductImageProps): JSX.Element => {
  const classes = ['h-32', 'object-contain', 'mx-auto'];

  if (shadow) classes.push('drop-shadow-lg');

  return (
    <Image 
      src={src} 
      alt={alt} 
      imageClassName={classes} 
    />
  );
};

export { ProductImage };