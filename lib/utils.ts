import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { IFootballFixtureResponse, ILeague } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupGamesByLeague = (collection: IFootballFixtureResponse[]) => {
  const cMap = new Map<number, { games: Omit<IFootballFixtureResponse, 'league'>[]; league: ILeague }>();

  for (let i = 0; i < collection.length; i++) {
    const { league, ...c } = collection[i];
    const key = league.id;
    const games = cMap.get(key)?.games || [];
    games.push(c);

    cMap.set(key, { games, league });
  }

  return cMap;
};
