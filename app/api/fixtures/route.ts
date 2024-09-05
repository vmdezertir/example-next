import { ApiError } from 'next/dist/server/api-utils';
import type { NextRequest } from 'next/server';

import { FootballApiService } from '@/lib/request';
import { TFixturesGroupBy, groupGames } from '@/lib/utils';

const { USE_FAKE_DATA } = process.env;

const fixtures = require('./fixtures.json');
const lFixtures = require('./league-fixtures.json');

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const redirectPathName = pathname.split('/api/')[1];

  if (!redirectPathName) {
    return Response.json({ error: 'Route not found' }, { status: 404 });
  }

  const isLeague = searchParams.get('league');
  const groupBy: TFixturesGroupBy = searchParams.get('groupBy') as TFixturesGroupBy;

  try {
    let restData;

    if (USE_FAKE_DATA) {
      restData = isLeague ? lFixtures : fixtures;
    } else {
      searchParams.delete('groupBy');
      restData = await FootballApiService.get(redirectPathName, searchParams);
    }
    const { groupedMap, sortedList } = groupGames(restData.response, groupBy || 'league');

    return Response.json({
      fixtures: Object.fromEntries(groupedMap),
      sortedLeagueIds: sortedList,
    });
  } catch (error: any) {
    console.error('FootballApiService error:', error);

    if (error instanceof ApiError && error?.message?.includes('reached the request limit')) {
      return Response.json({ message: 'PLAN_LIMIT' }, { status: 429 });
    }

    if (error instanceof ApiError) {
      return Response.json({ message: error.message }, { status: error.statusCode });
    }
    return Response.json({ message: 'Server died for some reason' }, { status: 500 });
  }
}
