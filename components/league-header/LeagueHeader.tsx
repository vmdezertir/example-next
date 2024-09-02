import { useMemo } from 'react';

import { Icon } from '@/components/icon';
import { ICountry, ILeagueInfo, ISeason } from '@/types';
import { type IconName } from '@/types/name';

import { ClientImage } from '../ui';
import styles from './styles.module.scss';

interface ILeagueHeaderProps {
  league: ILeagueInfo;
  country: ICountry;
  season: ISeason;
}

export const LeagueHeader = ({ league, country, season }: ILeagueHeaderProps) => {
  const marks: { icon: IconName; title: string; text: string }[] = useMemo(
    () => [
      { icon: 'MdOutlinePlace', title: 'Country', text: country.name },
      { icon: 'GiSoccerKick', title: 'Status', text: season.current ? 'Active' : 'Past' },
      { icon: 'MdCalendarMonth', title: 'Period', text: `${season.start}/${season.end}` },
    ],
    [country.name, season.current, season.start, season.end],
  );
  return (
    <div className={styles.header}>
      <div className="flex flex-row">
        <ClientImage src={league.logo} fallbackSrc={''} size={60} alt={`${league.name} logotype`} />
        <div className="ml-2">
          <h3 className="text-lg font-bold">{league.name}</h3>
          <div className="flex flex-row">
            {marks.map(({ icon, title, text }) => (
              <p key={title} className={styles.row}>
                <Icon className="mr-1 h-[25px] w-[25px]" name={icon} />
                {title}:<strong className="ml-1 text-gray-600">{text}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
