import { clsx } from 'clsx';
import { useMemo } from 'react';

import { TeamLogo } from '../team/TeamLogo';
import styles from './styles.module.scss';

interface ITeamInfoProps {
  team: {
    id: number;
    name: string;
    logo: string;
    winner: boolean | null;
  };
  iconPosition?: 'left' | 'right';
}

export const TeamInfo = ({ team, iconPosition = 'left' }: ITeamInfoProps) => {
  const isLeftPosition = iconPosition === 'left';

  const TeamLogoComponent = useMemo(() => <TeamLogo logo={team.logo} name={team.name} size={25} />, [team]);

  return (
    <div className={styles.item_row}>
      {isLeftPosition ? TeamLogoComponent : null}
      <p className={clsx(styles.team_name, isLeftPosition ? 'ms-2' : 'me-2')}>{team.name}</p>
      {!isLeftPosition ? TeamLogoComponent : null}
    </div>
  );
};
