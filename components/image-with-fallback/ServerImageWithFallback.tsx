import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image, { type ImageProps } from 'next/image';

import fs from 'fs';
import path from 'path';

async function getImageSrc(src: string | StaticImport, fallbackSrc: string) {
  if (typeof src === 'object') return src;

  if (!src) return fallbackSrc;

  if (src.startsWith('data:')) return src;

  // external image
  if (src.startsWith('http') || src.startsWith('//')) {
    const isImageExist = await checkRemouteImageExist(src);

    return isImageExist ? src : fallbackSrc;
  }

  // local image
  const localImagePath = path.join(process.cwd(), 'public', src);
  const isImageExist = await checkLocalImageExist(localImagePath);

  return isImageExist ? src : fallbackSrc;
}

async function checkLocalImageExist(imagePath: string): Promise<boolean> {
  try {
    await fs.promises.access(imagePath, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function checkRemouteImageExist(imageUrl: string) {
  try {
    const res = await fetch(imageUrl, { method: 'HEAD' });
    return res.ok;
  } catch {
    return false;
  }
}

type TServerImageProps = ImageProps & {
  fallbackSrc: string;
  size?: number;
};

export const ServerImage = async ({ src, alt = '', size = 25, fallbackSrc, ...props }: TServerImageProps) => {
  const imageSrc = await getImageSrc(src, fallbackSrc);

  return <Image src={imageSrc} width={size} height={size} alt={alt} loading="lazy" quality={80} {...props} />;
};
