'use client';

import Image, { type ImageProps } from 'next/image';

import { useEffect, useMemo, useState } from 'react';

type TClientImageProps = ImageProps & {
  fallbackSrc: string;
  size?: number;
};

export const ClientImage = ({ src, alt = '', size = 25, fallbackSrc, ...props }: TClientImageProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  const imageStyle = useMemo(
    () => ({
      height: `${size}px`,
    }),
    [size],
  );

  return (
    <Image
      className={'object-contain'}
      style={imageStyle}
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
