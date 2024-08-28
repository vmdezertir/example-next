import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { leagueOptions } from '@/queryOptions/leagues';

import { LeaguePage } from './league';

interface ILeagueProps {
  params: { slug: number };
}

export default async function League({ params }: ILeagueProps) {
  const queryClient = new QueryClient();

  void (await queryClient.prefetchQuery(leagueOptions(params.slug)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LeaguePage id={params.slug} />
    </HydrationBoundary>
  );
}
