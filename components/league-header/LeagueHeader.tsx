import { useMemo } from 'react';
import { GiSoccerKick } from 'react-icons/gi';
import { MdOutlinePlace } from 'react-icons/md';
import { MdCalendarMonth } from 'react-icons/md';

import { ICountry, ILeagueInfo, ISeason } from '@/types';

import { ClientImage } from '../ui';
import styles from './styles.module.scss';

interface ILeagueHeaderProps {
  league: ILeagueInfo;
  country: ICountry;
  season: ISeason;
}

export const LeagueHeader = ({ league, country, season }: ILeagueHeaderProps) => {
  const marks = useMemo(
    () => [
      { Icon: MdOutlinePlace, title: 'Country', text: country.name },
      { Icon: GiSoccerKick, title: 'Status', text: !!season.current ? 'Active' : 'Past' },
      { Icon: MdCalendarMonth, title: 'Period', text: `${season.start}/${season.end}` },
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
            {marks.map(({ Icon, title, text }) => (
              <p key={title} className={styles.row}>
                <Icon size={25} className="mr-1" />
                {title}:<strong className="ml-1 text-gray-600">{text}</strong>
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
