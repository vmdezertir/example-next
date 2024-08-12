import React from 'react';

import { Loading as LoadingComponent } from '../components/loading';

export default function Loading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <LoadingComponent color="#355944" />
    </div>
  );
}
