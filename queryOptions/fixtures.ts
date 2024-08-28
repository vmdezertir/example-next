import { QueryFunctionContext, queryOptions } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';

import { isFixtureLive, isFixtureScheduled } from '@/lib/helpers';
import {
  IFixtureApiResponse,
  IFixturesResponse,
  IFootballFixtureByIdResponse,
  IFootballFixtureResponse,
} from '@/types';

const getDayFixtures = async ({ queryKey }: QueryFunctionContext) => {
  const [_, date] = queryKey;

  const { data }: AxiosResponse<IFixtureApiResponse> = await axios.get(`/api/fixtures?date=${date}&groupBy=league`);

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

  const { data }: AxiosResponse<IFootballFixtureByIdResponse[]> = await axios.get(`/api/proxy/fixtures?id=${id}`);

  return data[0];
};

export const fixtureOptions = (id: number) =>
  queryOptions({
    queryKey: ['fixture', id],
    queryFn: getFixture,
  });

const getFixtureH2h = async ({ queryKey }: QueryFunctionContext) => {
  const [_, h2h] = queryKey;

  const { data }: AxiosResponse<IFootballFixtureResponse[]> = await axios.get(
    `/api/proxy/fixtures/headtohead?h2h=${h2h}&last=10&status='FT-AET-PEN'`,
  );

  return data;
};

export const fixtureH2hOptions = (h2h: string) =>
  queryOptions({
    queryKey: ['fixture_h2h', h2h],
    queryFn: getFixtureH2h,
  });

const getLeagueFixtures = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id, season] = queryKey;

  const { data }: AxiosResponse<IFixtureApiResponse> = await axios.get(
    `/api/fixtures?league=${id}&season=${season}&groupBy=round`,
  );

  const result: {
    scheduled: IFixturesResponse;
    finished: IFixturesResponse;
    sortedList: number[];
  } = {
    finished: {},
    scheduled: {},
    sortedList: data.sortedLeagueIds,
  };

  const grouped = Object.values(data.fixtures).reduce(
    (acc, { league, games }) => {
      const scheduledGames = [];
      const finishedGames = [];

      for (let index = 0; index < games.length; index++) {
        const game = games[index];

        const { short } = game.fixture.status;

        if (isFixtureScheduled(short)) {
          scheduledGames.push(game);
        } else {
          finishedGames.push(game);
        }
      }

      if (scheduledGames.length) {
        acc.scheduled[league.round] = {
          league,
          games: scheduledGames,
        };
      }

      if (finishedGames.length) {
        acc.finished[league.round] = {
          league,
          games: finishedGames,
        };
      }

      return acc;
    },
    { finished: {}, scheduled: {} } as {
      scheduled: IFixturesResponse;
      finished: IFixturesResponse;
    },
  );

  return { ...result, ...grouped };
};

export const leagueFixturesOptions = (id: number, season: number) =>
  queryOptions({
    queryKey: ['league-fixtures', id, season],
    queryFn: getLeagueFixtures,
  });
