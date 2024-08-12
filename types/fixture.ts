import { BaseFootballApiResponse, CommonIdName } from './common';
import { ILeague } from './league';
import { IShortInfoTeam, ITeams } from './team';

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

export interface ICountry {
  name: string;
  code: string;
  flag: string;
}

export interface ICareer {
  team: IShortInfoTeam;
  start: string;
  end: string | null;
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

export type IFixturesResponse = Record<number, { games: Omit<IFootballFixtureResponse, 'league'>[]; league: ILeague }>;

export interface IFixtureApiResponse {
  fixtures: IFixturesResponse;
  sortedLeagueIds: number[];
}

export enum EFixtureEventType {
  Goal = 'Goal',
  Card = 'Card',
  Subst = 'Subst',
  subst = 'subst',
  Var = 'Var',
}
export interface IFixtureEvent {
  time: {
    elapsed: number;
    extra: number | null;
  };
  team: IShortInfoTeam;
  player: CommonIdName;
  assist: CommonIdName;
  type: EFixtureEventType;
  detail: string;
  comments: string | null;
}

export interface IPlayer extends CommonIdName {
  photo: string | null;
}

export interface ITeamColor {
  border: string;
  number: string;
  primary: string;
}
export interface IFixtureLineupTeamWithColors extends IShortInfoTeam {
  colors: {
    goalkeeper: ITeamColor;
    player: ITeamColor;
  };
}

export interface ITeamPositionInfo {
  id: number;
  name: string;
  number: number;
  pos: string;
  grid: string | null;
}

export interface IFixtureLineupTeamPlayer {
  player: ITeamPositionInfo;
}
export interface IFixtureTeamLineup {
  coach: IPlayer;
  formation: string;
  team: IFixtureLineupTeamWithColors;
  startXI: IFixtureLineupTeamPlayer[];
  substitutes: IFixtureLineupTeamPlayer[];
}

export interface IFixtureStat {
  type: string;
  value: number | string;
}

export interface IFixtureTeamStats {
  statistics: IFixtureStat[];
  team: IShortInfoTeam;
}
export interface IFootballFixtureByIdResponse extends IFootballFixtureResponse {
  events?: IFixtureEvent[];
  lineups?: [IFixtureTeamLineup, IFixtureTeamLineup];
  players?: any;
  statistics?: [IFixtureTeamStats, IFixtureTeamStats];
}
