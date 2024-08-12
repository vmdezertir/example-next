import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { fixtureOptions } from '@/queryOptions/fixtures';

import { FixturePage } from './fixture';

interface IFixturePageProps {
  params: { slug: number };
}

export default async function Fixture({ params }: IFixturePageProps) {
  const queryClient = new QueryClient();

  void (await queryClient.prefetchQuery(fixtureOptions(params.slug)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FixturePage id={params.slug} />
    </HydrationBoundary>
  );
}
