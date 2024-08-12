import { ApiError } from 'next/dist/server/api-utils';
import type { NextRequest } from 'next/server';

import { FootballApiService } from '@/lib/request';
import { groupGamesByLeague } from '@/lib/utils';

const data = require('./data.json');

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const redirectPathName = pathname.split('/api/')[1];

  if (!redirectPathName) {
    return Response.json({ error: 'Route not found' }, { status: 404 });
  }

  try {
    // const data = await FootballApiService.get(redirectPathName, searchParams);
    const { groupedMap, sortedList } = groupGamesByLeague(data.response);

    return Response.json({
      fixtures: Object.fromEntries(groupedMap),
      sortedLeagueIds: sortedList,
    });
  } catch (error: any) {
    console.error('FootballApiService error', error);

    if (error instanceof ApiError) {
      return Response.json({ message: error.message }, { status: error.statusCode });
    }
    return Response.json({ message: 'Server died for some reason' }, { status: 500 });
  }
}
