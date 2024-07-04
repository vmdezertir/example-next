import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

import { getDayFixtures } from '@/api/fixtures';
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

  await queryClient.prefetchQuery({
    queryKey: ['day-fixtures'],
    queryFn: getDayFixtures,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage activeTab={activeTab} />
    </HydrationBoundary>
  );
}
