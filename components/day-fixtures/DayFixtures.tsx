import { IFixturesResponse } from '@/types';

import { FixtureItem } from '../fixture-item';

interface IDayFixturesProps {
  sort: number[];
  fixtures: IFixturesResponse;
}

export const DayFixtures = ({ sort, fixtures }: IDayFixturesProps) => {
  return (
    <ul className="mx-auto mt-3 w-full overflow-hidden bg-white shadow sm:rounded-md">
      {sort.map(leagueId => {
        const data = fixtures[leagueId];

        if (!data) return null;

        const { league, games } = data;

        return (
          <li key={leagueId} className="px-4 py-3 sm:px-6">
            <p className="flex items-center border-b pb-2 text-gray-600">
              {league.flag && <img className="mr-2 h-5" src={league.flag} />}
              {league.country}. {league.name}
            </p>
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
