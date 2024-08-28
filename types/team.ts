import { ILeague } from '@/types/league';

import { CommonIdName } from './common';
import { ICareer, ICountry } from './fixture';

export interface IShortInfoTeam extends CommonIdName {
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

export interface IShortInfoTeamWithUpdate extends IShortInfoTeam {
  update: string;
}

export interface IFullInfoTeam extends IShortInfoTeam {
  code: string;
  country: string;
  founded: number;
  national: boolean;
}

export interface IVenue extends CommonIdName {
  address: string;
  city: string;
  capacity: number;
  surface: string;
  image: string;
}
export interface IFootballTeamResponse {
  team: IFullInfoTeam;
  venue: IVenue;
}
