import { IFixtureTeam } from '@/types';

import { TeamLogo } from '../team/TeamLogo';
import styles from './styles.module.scss';

interface ITeamInfoProps {
  team: IFixtureTeam;
}

export const TeamInfo = ({ team }: ITeamInfoProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={styles.teamLogo}>
        <TeamLogo size={60} logo={team.logo} name={team.name} />
      </div>
      <h2 className="mt-6 text-center text-xl font-semibold">{team.name}</h2>
    </div>
  );
};
