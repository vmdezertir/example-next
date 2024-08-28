import { BaseFootballApiResponse, CommonIdName } from './common';
import { ICountry } from './fixture';
import { IShortInfoTeam } from './team';

export interface ILeagueInfo extends CommonIdName {
  type: string;
  logo: string;
}
export interface ILeague extends Omit<ILeagueInfo, 'type'> {
  country: string;
  flag: string;
  season: number;
  round: string;
}

export interface IPLeague extends Omit<ILeagueInfo, 'type'> {
  season: number;
  country: string;
  flag: string;
}

export interface ISeason {
  year: number;
  start: string;
  end: string;
  current: boolean;
}

export interface IFootballLeagueResponse {
  league: ILeagueInfo;
  country: ICountry;
  seasons: ISeason[];
}
export interface IFootballLeagueApiResponse extends BaseFootballApiResponse {
  response: IFootballLeagueResponse[];
}

export interface IStandingsStats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: {
    for: number;
    against: number;
  };
}

export interface IStandings {
  rank: number;
  team: IShortInfoTeam;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string;
  all: IStandingsStats;
  home: IStandingsStats;
  away: IStandingsStats;
  update: string;
}
export interface ILeagueWithStandings extends Omit<ILeague, 'round'> {
  standings: IStandings[][];
}
export interface IFootballStandingsResponse {
  league: ILeagueWithStandings;
}
