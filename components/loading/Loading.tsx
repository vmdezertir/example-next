'use client';

import React from 'react';
import { RiseLoader } from 'react-spinners';

export function Loading({ color }: { color: string }) {
  return <RiseLoader color={color} size={30} />;
}
