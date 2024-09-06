import { ApiError } from 'next/dist/server/api-utils';
import type { NextRequest } from 'next/server';

import { FootballApiService } from '@/lib/request';

const fixture = require('./fixture.json');
const h2h = require('./h2h.json');
const league = require('./league.json');
const standings = require('./standings.json');
const teams = require('./league-teams.json');

const { USE_FAKE_DATA } = process.env;

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const redirectPathName = pathname.split('/api/proxy/')[1];

  if (!redirectPathName) {
    return Response.json({ error: 'Route not found' }, { status: 404 });
  }

  try {
    let restData = { response: [] };

    if (USE_FAKE_DATA && USE_FAKE_DATA === 'true') {
      if (redirectPathName.startsWith('fixtures/headtohead')) {
        restData = h2h;
      } else if (redirectPathName.startsWith('fixtures')) {
        restData = fixture;
      } else if (redirectPathName.startsWith('leagues')) {
        restData = league;
      } else if (redirectPathName.startsWith('standings')) {
        restData = standings;
      } else if (redirectPathName.startsWith('teams')) {
        restData = teams;
      }
    } else {
      restData = await FootballApiService.get(redirectPathName, searchParams);
    }

    return Response.json(restData.response);
  } catch (error: any) {
    console.error('FootballApiService error', error);

    if (error instanceof ApiError && error?.message?.includes('reached the request limit')) {
      return Response.json({ message: 'PLAN_LIMIT' }, { status: 429 });
    }

    if (error instanceof ApiError) {
      return Response.json({ message: error.message }, { status: error.statusCode });
    }
    return Response.json({ message: 'Server died for some reason' }, { status: 500 });
  }
}
