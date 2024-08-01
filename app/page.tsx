import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { DateTime } from 'luxon';

import { dayFixtureOptions } from '@/queryOptions/fixtures';
import { EFixtureTabStatus } from '@/types';

import { HomePage } from './home';

interface IHomePageProps {
  searchParams: {
    status?: EFixtureTabStatus;
  };
}

export default async function Home({ searchParams }: IHomePageProps) {
  const { status: activeTab = EFixtureTabStatus.ALL } = searchParams;

  const queryClient = new QueryClient();
  const today = DateTime.utc().toFormat('yyyy-MM-dd');

  void (await queryClient.prefetchQuery(dayFixtureOptions(today)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage activeTab={activeTab} />
    </HydrationBoundary>
  );
}
