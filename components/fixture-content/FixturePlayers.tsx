import { IFixtureTeamPlayersStat } from '@/types';

import { PlayerStats } from '../player-stats';

interface IFixturePlayersProps {
  players?: [IFixtureTeamPlayersStat, IFixtureTeamPlayersStat];
}
export const FixturePlayers = ({ players }: IFixturePlayersProps) => {
  if (!players?.length || (!players[0] && !players[1])) {
    return null;
  }

  return (
    <div>
      <PlayerStats {...players[0]} />
      <PlayerStats {...players[1]} />
    </div>
  );
};
