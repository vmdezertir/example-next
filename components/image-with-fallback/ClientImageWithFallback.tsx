'use client';

import Image, { type ImageProps } from 'next/image';

import { useEffect, useState } from 'react';

type TClientImageProps = ImageProps & {
  fallbackSrc: string;
  size?: number;
};

export const ClientImage = ({ src, alt = '', size = 25, fallbackSrc, ...props }: TClientImageProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      src={error ? fallbackSrc : src}
      width={size}
      height={size}
      alt={alt}
      loading="lazy"
      quality={80}
      onError={() => setError(true)}
      {...props}
    />
  );
};
