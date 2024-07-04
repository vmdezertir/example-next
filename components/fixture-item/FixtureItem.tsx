import Link from 'next/link';

import { LucideIcon } from '../lucide-icon';
import { TeamInfo } from './Team';
import styles from './styles.module.scss';

export const FixtureItem = () => {
  return (
    <Link href="/fixture/1">
      <li className={styles.item}>
        <div className={styles.item_row}>
          <h3 className="text-sm font-medium leading-6 text-green-600">FT</h3>
          <div className="flex items-center">
            <TeamInfo
              iconPosition="right"
              team={{
                id: 1,
                name: 'Miami AC',
                logo: 'https://media.api-sports.io/football/teams/18900.png',
                winner: null,
              }}
            />
            <span className="mx-2 whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-sky-600">
              -:-
            </span>
            <TeamInfo
              iconPosition="left"
              team={{
                id: 1,
                name: 'Weston',
                logo: 'https://media.api-sports.io/football/teams/41012222343.png',
                winner: null,
              }}
            />
          </div>
          <div className={styles.item_row_icon}>
            <LucideIcon name="circle-arrow-right" />
          </div>
        </div>
      </li>
    </Link>
  );
};
