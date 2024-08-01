import { QueryFunctionContext, queryOptions } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { DateTime } from 'luxon';

import { isFixtureLive, isFixtureScheduled } from '@/lib/helpers';
import { IFixtureApiResponse, IFootballFixtureResponse } from '@/types';

const getDayFixtures = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;

  const { data }: AxiosResponse<IFixtureApiResponse> = await axios.get(`/api/fixtures?date=${id}`);

  const result: {
    all: IFixtureApiResponse;
    live: IFixtureApiResponse;
    scheduled: IFixtureApiResponse;
    finished: IFixtureApiResponse;
  } = {
    all: data,
    live: [],
    finished: [],
    scheduled: [],
  };

  const dateToCompare = DateTime.fromISO(id as string, { zone: 'utc' });
  const now = DateTime.utc();

  if (dateToCompare < now) {
    result.finished = data;
    return result;
  } else if (dateToCompare > now) {
    result.scheduled = data;
    return result;
  }

  return result;

  // const grouped = data.response.reduce(
  //   (acc, val) => {
  //     const { short } = val.fixture.status;

  //     if (isFixtureLive(short)) {
  //       acc.live.push(val);
  //     } else if (isFixtureScheduled(short)) {
  //       acc.scheduled.push(val);
  //     } else {
  //       acc.finished.push(val);
  //     }

  //     return acc;
  //   },
  //   { live: [], finished: [], scheduled: [] } as {
  //     live: IFootballFixtureResponse[];
  //     scheduled: IFootballFixtureResponse[];
  //     finished: IFootballFixtureResponse[];
  //   },
  // );

  // return { ...result, ...grouped };
};

export const dayFixtureOptions = (id: string) =>
  queryOptions({
    queryKey: ['day-fixtures', id],
    queryFn: getDayFixtures,
  });
