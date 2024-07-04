import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { FOOTBALL_API_HOST, FOOTBALL_API_KEY } = process.env;

  const { pathname, search } = request.nextUrl;
  const redirectPathName = pathname.split('/api/proxy/')[1];

  if (!redirectPathName) {
    return Response.json({ error: 'Route not found' }, { status: 404 });
  }

  const externalApiResp = await fetch(`https://${FOOTBALL_API_HOST}/${redirectPathName}${search}`, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': FOOTBALL_API_HOST as string,
      // 'x-rapidapi-key': FOOTBALL_API_KEY as string,
    },
  });
  const data = await externalApiResp.json();

  return Response.json(data);
}
