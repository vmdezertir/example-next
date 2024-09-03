'use client';

import Head from 'next/head';

export const PreloadResources = () => {
  return (
    <Head>
      <link rel="preload" href="/icons/sprite.svg" as="image" />
    </Head>
  );
};
