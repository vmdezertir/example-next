import Link from 'next/link';

import { clsx } from 'clsx';
import { useMemo } from 'react';

import { Icon } from '@/components/icon';
import { IFootballFixtureResponse } from '@/types';

import { ScoreInfo } from './Score';
import { StatusInfo } from './Status';
import { TeamInfo } from './Team';
import styles from './styles.module.scss';

interface IFixtureItemProps {
  data: Omit<IFootballFixtureResponse, 'league'>;
  fullDate?: boolean;
}

export const FixtureItem = ({ data, fullDate = false }: IFixtureItemProps) => {
  const info = useMemo(
    () => ({
      status: data.fixture.status,
      date: data.fixture.date,
      fId: data.fixture.id,
    }),
    [data],
  );

  return (
    <Link href={`/fixture/${info.fId}`} key={info.fId}>
      <li className={styles.item}>
        <div className={styles.item_row}>
          <h3 className="inline-block w-40 text-sm font-medium leading-6">
            <StatusInfo status={info.status} date={info.date} fullDate={fullDate} />
          </h3>
          <div className="grid h-6 max-h-6 w-full grid-cols-9 gap-3">
            <div className="col-span-4">
              <TeamInfo iconPosition="right" team={data.teams.home} />
            </div>
            <div className="mx-2 flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-0.5">
              <ScoreInfo status={info.status} score={data.score} goals={data.goals} />
            </div>
            <div className="col-span-4">
              <TeamInfo iconPosition="left" team={data.teams.away} />
            </div>
          </div>
          <div className={clsx(styles.item_row_icon, 'w-5')}>
            <Icon className="h-[30px] w-[30px]" name={'IoIosArrowDropright'} />
          </div>
        </div>
      </li>
    </Link>
  );
};
