import { QueryFunctionContext, queryOptions } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { IFootballLeagueResponse, IFootballStandingsResponse, IFootballTeamResponse } from '@/types';

const getLeague = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id] = queryKey;

  const { data }: AxiosResponse<IFootballLeagueResponse[]> = await axios.get(`/api/proxy/leagues?id=${id}`);

  return data[0];
};

export const leagueOptions = (id: number) =>
  queryOptions({
    queryKey: ['league', id],
    queryFn: getLeague,
  });

const getLeagueStandings = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id, season] = queryKey;

  const { data }: AxiosResponse<IFootballStandingsResponse[]> = await axios.get(
    `/api/proxy/standings?league=${id}&season=${season}`,
  );

  return data[0];
};

export const leagueStandingOptions = (id: number, season: number) =>
  queryOptions({
    queryKey: ['league-standings', id, season],
    queryFn: getLeagueStandings,
  });

const getLeagueTeams = async ({ queryKey }: QueryFunctionContext) => {
  const [_, id, season] = queryKey;

  const { data }: AxiosResponse<IFootballTeamResponse[]> = await axios.get(
    `/api/proxy/teams?league=${id}&season=${season}`,
  );

  return data;
};

export const leagueTeamsOptions = (id: number, season: number) =>
  queryOptions({
    queryKey: ['league-teams', id, season],
    queryFn: getLeagueTeams,
  });
