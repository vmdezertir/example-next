'use client';

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
    <div className="mx-auto h-full max-w-screen-xl px-4 py-3">
      <div className="h-full rounded-lg bg-gray-200 p-4">
        <LeagueHeader league={data.league} country={data.country} season={lastSeason} />
        <LeagueContent season={lastSeason} />
      </div>
    </div>
  );
};
