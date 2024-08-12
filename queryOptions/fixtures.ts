import { QueryFunctionContext, queryOptions } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';

import { isFixtureLive, isFixtureScheduled } from '@/lib/helpers';
import { IFixtureApiResponse, IFixturesResponse } from '@/types';

const getDayFixtures = async ({ queryKey }: QueryFunctionContext) => {
  const [_, date] = queryKey;

  const { data }: AxiosResponse<IFixtureApiResponse> = await axios.get(`/api/fixtures?date=${date}`);

  const result: {
    all: IFixturesResponse;
    live: IFixturesResponse;
    scheduled: IFixturesResponse;
    finished: IFixturesResponse;
    sortedList: number[];
  } = {
    all: data.fixtures,
    live: {},
    finished: {},
    scheduled: {},
    sortedList: data.sortedLeagueIds,
  };

  const dateToCompare = DateTime.fromISO(date as string).startOf('day');
  const now = DateTime.now().startOf('day');

  if (dateToCompare < now) {
    result.finished = data.fixtures;
    return result;
  } else if (dateToCompare > now) {
    result.scheduled = data.fixtures;
    return result;
  }

  const grouped = Object.values(data.fixtures).reduce(
    (acc, { league, games }) => {
      const liveGames = [];
      const scheduledGames = [];
      const finishedGames = [];

      for (let index = 0; index < games.length; index++) {
        const game = games[index];

        const { short } = game.fixture.status;

        if (isFixtureLive(short)) {
          liveGames.push(game);
        } else if (isFixtureScheduled(short)) {
          scheduledGames.push(game);
        } else {
          finishedGames.push(game);
        }
      }

      if (liveGames.length) {
        acc.live[league.id] = {
          league,
          games: liveGames,
        };
      }

      if (scheduledGames.length) {
        acc.scheduled[league.id] = {
          league,
          games: scheduledGames,
        };
      }

      if (finishedGames.length) {
        acc.finished[league.id] = {
          league,
          games: finishedGames,
        };
      }

      return acc;
    },
    { live: {}, finished: {}, scheduled: {} } as {
      live: IFixturesResponse;
      scheduled: IFixturesResponse;
      finished: IFixturesResponse;
    },
  );

  return { ...result, ...grouped };
};

export const dayFixtureOptions = (date: string) =>
  queryOptions({
    queryKey: ['day-fixtures', date],
    queryFn: getDayFixtures,
  });

const getFixture = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;

  const { data }: AxiosResponse<any> = await axios.get(`/api/proxy/fixtures?id=${id}`);

  return data[0];
};

export const fixtureOptions = (id: number) =>
  queryOptions({
    queryKey: ['fixture', id],
    queryFn: getFixture,
  });
