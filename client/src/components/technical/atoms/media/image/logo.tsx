import React from 'react';
import { Image } from './image';

interface LogoProps {
  src: string;
  alt: string;
  className?: Array<string>;
}

const Logo = ({ src, alt, className = [] }: LogoProps): JSX.Element => <Image className={className} src={src} alt={alt} />;

export { Logo };