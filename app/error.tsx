'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [errorMsg, setErrMsg] = useState('');
  const [limitErr, setLimitErr] = useState(false);

  useEffect(() => {
    const isAxiosErr = error instanceof AxiosError;

    if (isAxiosErr) {
      setErrMsg(error.response?.data.message);
    } else {
      setErrMsg(error.message);
    }

    if (isAxiosErr && error.response?.data.message === 'PLAN_LIMIT') {
      setLimitErr(true);
    }
  }, [error]);

  return limitErr ? (
    <section className="h-full bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Unfortunately, the request limit for today
            <strong className="font-extrabold text-red-700 sm:block"> has been exhausted. </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">We use the free version, which has a limit of 100 requests per day!</p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="https://www.api-football.com/pricing"
            >
              See pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className="h-full bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            <strong className="font-extrabold text-red-700 sm:block"> Oops, </strong> something’s gone wrong!
          </h1>
          <p className="mt-4 sm:text-xl/relaxed">Sorry for the inconvenience, we're working on it.</p>
          <p className="mt-4 sm:text-xl/relaxed">
            Error: <em className="text-red-700">{errorMsg}</em>
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={reset}
              className="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
