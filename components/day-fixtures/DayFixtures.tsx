import { IFixtureApiResponse } from '@/types';

import fallBackUrl from '../assets/default-team.svg?url';
import { FixtureItem } from '../fixture-item';
import { ClientImage } from '../image-with-fallback';

interface IDayFixturesProps {
  status: string;
  fixtures: IFixtureApiResponse;
}

export const DayFixtures = ({ status, fixtures }: IDayFixturesProps) => {
  return (
    <ul className="mx-auto mt-3 w-full overflow-hidden bg-white shadow sm:rounded-md">
      {Object.values(fixtures).map(({ games, league }) => (
        <li key={league.id} className="px-4 py-3 sm:px-6">
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
      ))}
    </ul>
  );
};
