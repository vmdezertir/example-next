import Link from 'next/link';

import { DateTime } from 'luxon';

import { Icon } from '@/components/icon';
import { isFixtureLive } from '@/lib/helpers';
import { IFixture, ILeague, ITeams, ITeamsGoals } from '@/types';

import { ClientImage } from '../ui';
import { TeamInfo } from './TeamInfo';
import styles from './styles.module.scss';

interface IFixtureHeaderProps {
  goals: ITeamsGoals;
  fixture: IFixture;
  teams: ITeams;
  league: ILeague;
}

export const FixtureHeader = ({ goals, fixture, teams, league }: IFixtureHeaderProps) => {
  const luxonDate = DateTime.fromISO(fixture.date).setLocale('en');

  return (
    <div className={styles.header}>
      <div className="flex items-center border-b-2 border-slate-300 p-4">
        {isFixtureLive(fixture.status.short) && (
          <span className={styles.badge}>
            <Icon className="mr-2 h-[20px] w-[20px]" name={'CgMediaLive'} />
            <p className="whitespace-nowrap text-sm">{fixture.status.short}</p>
          </span>
        )}
        <Link
          href={`/league/${league.id}`}
          className="flex flex-grow items-center justify-center text-gray-600 hover:text-green-700"
        >
          <ClientImage src={league.logo} fallbackSrc="/icons/no-image.svg" size={60} alt={`${league.name} logotype`} />
          <h3 className="text-lg font-bold">{`${league.name} ${league.round ? `(${league.round})` : ''}`}</h3>
        </Link>
      </div>
      <div className="relative flex columns-3 p-4">
        <div className="flex w-full items-center justify-center">
          <TeamInfo team={teams.home} />
        </div>
        <div className="w-full">
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-400">
              {luxonDate.toFormat('DD')} at <strong className="text-gray-600">{luxonDate.toFormat('T')}</strong>
            </div>
            <div className="mt-3 flex items-center text-5xl">
              <span className="font-semibold">{goals.home || 0}</span>
              <span className="px-2.5 text-3xl font-bold text-gray-300">:</span>
              <span className="font-semibold">{goals.away || 0}</span>
            </div>
            <div className="mt-2 text-sm font-semibold text-amber-600">{fixture.status.long}</div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <TeamInfo team={teams.away} />
        </div>
      </div>
    </div>
  );
};
