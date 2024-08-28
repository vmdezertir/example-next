import { LeagueTabType } from '.';
import { LeagueMatches } from './LeagueMatches';
import { Standings } from './Standings';
import { TeamsList } from './TeamsList';

interface IWrapperProps {
  tab: LeagueTabType;
  season: number;
}

export const Wrapper = ({ tab, season }: IWrapperProps) => {
  switch (tab) {
    case 'standings':
      return <Standings season={season} />;
    case 'matches':
      return <LeagueMatches season={season} />;
    case 'teams':
      return <TeamsList season={season} />;

    default:
      return null;
  }
};
