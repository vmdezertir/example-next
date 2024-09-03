import { NoData } from '@/components/no-data';
import { PlayerStats } from '@/components/player-stats';
import { IFixtureTeamPlayersStat } from '@/types';

interface IFixturePlayersProps {
  players?: [IFixtureTeamPlayersStat, IFixtureTeamPlayersStat];
}
export const FixturePlayers = ({ players }: IFixturePlayersProps) => {
  if (!players?.length || (!players[0] && !players[1])) {
    return <NoData icon="GiBabyfootPlayers" text="There are no statistical data for players" />;
  }

  return (
    <div>
      <PlayerStats {...players[0]} />
      <PlayerStats {...players[1]} />
    </div>
  );
};
