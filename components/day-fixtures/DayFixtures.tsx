import Link from 'next/link';

import { useMemo } from 'react';

import { FixtureItem } from '@/components/fixture-item';
import { NoData } from '@/components/no-data';
import { IFixturesResponse } from '@/types';

interface IDayFixturesProps {
  sort: number[];
  fixtures: IFixturesResponse;
}

export const DayFixtures = ({ sort, fixtures }: IDayFixturesProps) => {
  const daySort = useMemo(
    () =>
      sort.reduce((acc, v) => {
        if (fixtures[v]) {
          acc.push(v);
        }

        return acc;
      }, [] as number[]),
    [sort, fixtures],
  );

  if (!daySort.length) {
    return <NoData text="No football matches found" withIcon />;
  }

  return (
    <ul className="mx-auto mt-3 w-full overflow-hidden bg-white shadow sm:rounded-md">
      {daySort.map(leagueId => {
        const data = fixtures[leagueId];
        const { league, games } = data;

        return (
          <li key={leagueId} className="px-4 py-3 sm:px-6">
            <Link
              href={`/league/${leagueId}`}
              className="flex items-center border-b pb-2 text-gray-600 hover:text-green-700"
            >
              {league.flag && <img className="mr-2 h-5" src={league.flag} />}
              {league.country}. {league.name}
            </Link>
            <ul>
              {games.map(game => (
                <FixtureItem key={game.fixture.id} data={game} />
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
};
