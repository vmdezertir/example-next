import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { IFootballFixtureResponse, ILeague } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const groupGamesByLeague = (collection: IFootballFixtureResponse[]) => {
  const cMap = new Map<number, { games: Omit<IFootballFixtureResponse, 'league'>[]; league: ILeague }>();
  const lMap = new Map<number, ILeague>();

  for (let i = 0; i < collection.length; i++) {
    const { league, ...c } = collection[i];
    const key = league.id;
    const games = cMap.get(key)?.games || [];
    games.push(c);

    cMap.set(key, { games, league });
    if (!lMap.has(key)) {
      lMap.set(key, league);
    }
  }

  return {
    groupedMap: cMap,
    sortedList: [...lMap.values()].sort((lA, lB) => lA.country.localeCompare(lB.country)).map(l => l.id),
  };
};
