'use client';

import Head from 'next/head';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { LeagueContent } from '@/components/league-content';
import { LeagueHeader } from '@/components/league-header';
import { leagueOptions } from '@/queryOptions/leagues';

interface ILeaguePageProps {
  id: number;
}

export const LeaguePage = ({ id }: ILeaguePageProps) => {
  const { data } = useSuspenseQuery(leagueOptions(id));

  const lastSeason = useMemo(() => data.seasons[data.seasons.length - 1], [data.seasons]);

  return (
    <>
      <Head>
        <title>{`${data.league.name} - Standings, Teams & Fixtures | Football`}</title>

        <meta
          name="description"
          content="Comprehensive information on the football tournament, including standings, team list, and all matches for the season. Explore the tournament details and stay updated with the latest results."
        />
        <meta
          name="keywords"
          content="football tournament, tournament standings, team list, season fixtures, football results, soccer tournament"
        />
        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={`https://football-hub.com.ua/league/${data.league.id}`} />
      </Head>
      <div className="mx-auto h-full max-w-screen-xl px-4 py-3">
        <div className="h-full rounded-lg bg-gray-200 p-4">
          <LeagueHeader league={data.league} country={data.country} season={lastSeason} />
          <LeagueContent season={lastSeason} />
        </div>
      </div>
    </>
  );
};
