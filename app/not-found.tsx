import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="mx-auto h-full max-w-screen-xl place-content-center items-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black text-gray-200">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Sorry, page not found!</p>
        <p className="mt-4 text-gray-500">
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
          spelling.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
