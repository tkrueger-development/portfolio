import React from 'react';
import { useClassList } from '../../../../../hooks/use-class-list';

interface ImageProps {
  src: string;
  alt: string;
  center?: boolean;
  shadow?: boolean;
  imageClassName?: Array<string>;
  className?: Array<string>;
}

const Image = ({ src, alt, center, shadow, className = [], imageClassName = [] }: ImageProps): JSX.Element => {
  const [getClassList, appendClass] = useClassList();
  const [getImageClassList, appendImageClass] = useClassList();

  appendClass(...className);
  appendImageClass(...imageClassName);

  if (center) appendClass('mx-auto');
  if (shadow) appendClass('drop-shadow-md');

  return (
    <div className={getClassList()}>
      <img className={getImageClassList()} src={src} alt={alt} />
    </div>
  );
};

export { Image };