'use client';

import Head from 'next/head';
import Link from 'next/link';

import { useSuspenseQuery } from '@tanstack/react-query';
import { DateTime } from 'luxon';
import { Suspense } from 'react';
import { useMemo } from 'react';

import { DayFixtures } from '@/components/day-fixtures';
import { ErrorBoundary } from '@/components/error';
import { RefreshButton } from '@/components/refresh-button';
import { type TabProp, Tabs } from '@/components/tabs';
import { ClientImage } from '@/components/ui';
import { dayFixtureOptions } from '@/queryOptions/fixtures';
import { EFixtureTabStatus } from '@/types';

const TOP_LEAGUES = [
  {
    id: 39,
    name: 'Premier League 🇬🇧',
  },
  {
    id: 78,
    name: 'Bundesliga 🇩🇪',
  },
  {
    id: 140,
    name: 'LaLiga 🇪🇸',
  },
  {
    id: 135,
    name: 'Serie A 🇮🇹',
  },
  {
    id: 61,
    name: 'Ligue 1 🇫🇷',
  },
  {
    id: 333,
    name: 'Premier League 🇺🇦',
  },
];
interface IHomePageProps {
  activeTab: EFixtureTabStatus;
}

export const HomePage = ({ activeTab }: IHomePageProps) => {
  const today = DateTime.utc().toFormat('yyyy-MM-dd');
  const { data } = useSuspenseQuery(dayFixtureOptions(today));

  const tabsData: TabProp[] = useMemo(
    () => [
      { tab: 'all', title: 'All matches' },
      { tab: 'live', title: 'Live', icon: 'CgMediaLive', className: 'text-red-500' },
      { tab: 'finished', title: 'Finished' },
      { tab: 'scheduled', title: 'Scheduled' },
    ],
    [],
  );
  return (
    <ErrorBoundary>
      <Head>
        <title>Football Matches Today - Live Scores, Results & Fixtures</title>
        <meta
          name="description"
          content="Stay updated with today's football matches, including live scores, results, and upcoming games. Browse matches by tournaments and explore detailed game pages."
        />
        <meta
          name="keywords"
          content="football matches, live scores, football results, tournament fixtures, football today, soccer scores"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://football-hub.com.ua" />
      </Head>
      <div className="mx-auto h-full max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid h-full grid-cols-1 gap-4 overflow-x-hidden transition-[grid-template-columns] lg:grid-cols-[85px_1fr] lg:gap-8 lg:[&:has(>*:first-child:hover)]:grid-cols-[300px_1fr]">
          <div className="flex h-full flex-col whitespace-nowrap rounded-lg bg-gray-200 px-2 pt-10">
            {TOP_LEAGUES.map(({ name, id }) => (
              <Link
                href={`/league/${id}`}
                key={id}
                className="ml-2 mt-3 flex flex-row flex-nowrap items-center overflow-hidden p-2 hover:bg-gray-100 hover:text-gray-700"
              >
                <ClientImage
                  className="mr-[35px] min-w-[40px] object-contain"
                  src={`https://media.api-sports.io/football/leagues/${id}.png`}
                  fallbackSrc={''}
                  size={40}
                  alt={`${name} league logotype`}
                />
                <span>{name}</span>
              </Link>
            ))}
          </div>
          <div className="h-full rounded-lg bg-gray-200 p-2">
            <Suspense fallback={<div>Loading...</div>}>
              <Tabs tabName="status" tabs={tabsData} />
            </Suspense>
            <DayFixtures fixtures={data[activeTab]} sort={data.sortedList} />
          </div>
        </div>
      </div>
      <RefreshButton />
    </ErrorBoundary>
  );
};
