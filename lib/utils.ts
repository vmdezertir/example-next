import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { IFootballFixtureResponse, ILeague } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TFixturesGroupBy = 'league' | 'round';

export const groupGames = (collection: IFootballFixtureResponse[], groupBy: TFixturesGroupBy = 'league') => {
  const isByRound = groupBy === 'round';
  const cMap = new Map<number | string, { games: Omit<IFootballFixtureResponse, 'league'>[]; league: ILeague }>();
  const lMap = new Map<number | string, ILeague>();

  for (let i = 0; i < collection.length; i++) {
    const { league, ...c } = collection[i];
    const key = isByRound ? league.round : league.id;
    if (!key) {
      continue;
    }

    const games = cMap.get(key)?.games || [];
    games.push(c);

    cMap.set(key, { games, league });
    if (!lMap.has(key)) {
      lMap.set(key, league);
    }
  }

  const sortedList = isByRound
    ? [...lMap.values()].sort().map(l => l.round)
    : [...lMap.values()].sort((lA, lB) => lA.country.localeCompare(lB.country)).map(l => l.id);

  return {
    groupedMap: cMap,
    sortedList,
  };
};
