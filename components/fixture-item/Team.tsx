import { clsx } from 'clsx';
import { useMemo } from 'react';

import { IFixtureTeam } from '@/types';

import { TeamLogo } from '../team/TeamLogo';
import styles from './styles.module.scss';

interface ITeamInfoProps {
  team: IFixtureTeam;
  iconPosition?: 'left' | 'right';
}

export const TeamInfo = ({ team, iconPosition = 'left' }: ITeamInfoProps) => {
  const isLeftPosition = iconPosition === 'left';

  const TeamLogoComponent = useMemo(() => <TeamLogo logo={team.logo} name={team.name} size={25} />, [team]);

  return (
    <div className={clsx(styles.item_row, isLeftPosition ? 'justify-start' : 'justify-end')}>
      {isLeftPosition ? TeamLogoComponent : null}
      <p className={clsx(team.winner && 'font-bold', styles.team_name, isLeftPosition ? 'ms-2' : 'me-2')}>
        {team.name}
      </p>
      {!isLeftPosition ? TeamLogoComponent : null}
    </div>
  );
};
