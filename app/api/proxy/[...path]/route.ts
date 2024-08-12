import { ApiError } from 'next/dist/server/api-utils';
import type { NextRequest } from 'next/server';

import { FootballApiService } from '@/lib/request';

const data = require('./data.json');

export async function GET(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const redirectPathName = pathname.split('/api/proxy/')[1];

  if (!redirectPathName) {
    return Response.json({ error: 'Route not found' }, { status: 404 });
  }

  try {
    // const data = await FootballApiService.get(redirectPathName, searchParams);

    return Response.json(data.response);
  } catch (error: any) {
    console.error('FootballApiService error', error);

    if (error instanceof ApiError) {
      return Response.json({ message: error.message }, { status: error.statusCode });
    }
    return Response.json({ message: 'Server died for some reason' }, { status: 500 });
  }
}
