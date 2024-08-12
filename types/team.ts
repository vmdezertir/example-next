import { ILeague } from '@/types/league';

import { ICareer, ICountry } from './fixture';

export interface IShortInfoTeam {
  id: number;
  name: string;
  logo: string;
}

export interface IFixtureTeam extends IShortInfoTeam {
  winner: boolean;
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

export interface ITeams {
  away: IFixtureTeam;
  home: IFixtureTeam;
}
