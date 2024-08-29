'use client';

import Head from 'next/head';

import { useSuspenseQuery } from '@tanstack/react-query';

import { FixtureContent } from '@/components/fixture-content';
import { FixtureHeader } from '@/components/fixture-header';
import { fixtureOptions } from '@/queryOptions/fixtures';

interface IFixturePageProps {
  id: number;
}

export const FixturePage = ({ id }: IFixturePageProps) => {
  const { data } = useSuspenseQuery(fixtureOptions(id));

  return (
    <>
      <Head>
        <title>{`Match Details - ${data.teams.home.name} vs ${data.teams.away.name} | Football Stats & Predictions`}</title>
        <meta
          name="description"
          content="Detailed match information including statistics, player performance, key events, and predictions for the upcoming game. Get all the insights you need about this football match."
        />
        <meta
          name="keywords"
          content="football match details, match statistics, player stats, key events, football predictions, soccer analysis"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://football-hub.com.ua/fixture/${data.fixture.id}`} />
      </Head>
      <div className="mx-auto h-full max-w-screen-xl px-4 py-3">
        <div className="h-full rounded-lg bg-gray-200 p-4">
          <FixtureHeader goals={data.goals} fixture={data.fixture} teams={data.teams} league={data.league} />
          <FixtureContent />
        </div>
      </div>
    </>
  );
};
