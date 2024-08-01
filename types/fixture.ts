import { BaseFootballApiResponse } from './common';

export enum EFixtureStatus {
  // Scheduled
  TBD = 'TBD',
  NS = 'NS',
  // In Play
  LIVE = 'LIVE',
  '1H' = '1H',
  HT = 'HT',
  '2H' = '2H',
  ET = 'ET',
  BT = 'BT',
  P = 'P',
  SUSP = 'SUSP',
  INT = 'INT',
  // Finished
  FT = 'FT',
  AET = 'AET',
  PEN = 'PEN',
  // Postponed
  PST = 'PST',
  // Cancelled
  CANC = 'CANC',
  // Abandoned
  ABD = 'ABD',
  // Not Played
  AWD = 'AWD',
  WO = 'WO',
}

export interface IShortInfoTeam {
  id: number;
  name: string;
  logo: string;
}

export interface IFixtureTeam extends IShortInfoTeam {
  winner: boolean;
}

export interface IFixtureStatus {
  long: string;
  short: EFixtureStatus;
  elapsed: number;
}

export interface IFixturePeriods {
  first?: number | null;
  second?: number | null;
}

export interface IFixtureVenue {
  id: number;
  city: string;
  name: string;
}

export interface IFixture {
  id: number;
  date: string;
  periods?: IFixturePeriods;
  referee?: string | null;
  status: IFixtureStatus;
  timezone: string;
  timestamp: number;
  venue?: IFixtureVenue;
}

export interface ILeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
}

interface ICountry {
  name: string;
  code: string;
  flag: string;
}

interface ITeamSeason {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: object;
}
export interface ITeamLeagueResponse {
  league: ILeague;
  country: ICountry;
  seasons: ITeamSeason[];
}

export interface ICareer {
  team: IShortInfoTeam;
  start: string;
  end: string | null;
}
export interface ITeamCoachResponse {
  id: number;
  name: string;
  firstname: string;
  lastname: string;
  age: 47;
  birth: {
    date: string;
    place: string;
    country: string;
  };
  nationality: string;
  height: string;
  weight: string;
  photo: string;
  team: IShortInfoTeam;
  career: ICareer[];
}

export interface IPLeague {
  id: number;
  season: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
}

export interface ITeamsGoals {
  away?: number;
  home?: number;
}

export interface IScores {
  extratime: ITeamsGoals;
  fulltime: ITeamsGoals;
  halftime: ITeamsGoals;
  penalty: ITeamsGoals;
}

interface ITeams {
  away: IFixtureTeam;
  home: IFixtureTeam;
}

export interface IFootballFixtureResponse {
  fixture: IFixture;
  league: ILeague;
  teams: ITeams;
  goals: ITeamsGoals;
  score: IScores;
}
export interface IFootballFixtureApiResponse extends BaseFootballApiResponse {
  response: IFootballFixtureResponse[];
}

export type IFixtureApiResponse = Record<
  number,
  { games: Omit<IFootballFixtureResponse, 'league'>[]; league: ILeague }
>;
