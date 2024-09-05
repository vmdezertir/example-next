import { useMemo } from 'react';

import { NoData } from '@/components/no-data';
import { IFixtureTeamStats } from '@/types';

interface IFixtureStatsProps {
  stats?: [IFixtureTeamStats, IFixtureTeamStats];
}

export const FixtureStats = ({ stats }: IFixtureStatsProps) => {
  if (!stats?.length) {
    return <NoData icon="IoIosStats" text="There are no statistical data" />;
  }

  const [homeStats, awayStats] = stats;

  const statistics = useMemo(
    () =>
      homeStats.statistics.reduce(
        (acc, hStat, index) => {
          if (['expected_goals', 'goals_prevented'].includes(hStat.type)) {
            return acc;
          }

          const aStat = awayStats.statistics[index];
          let aStatValue = aStat.value;
          if (!aStat || aStat.type !== hStat.type) {
            aStatValue = awayStats.statistics?.find(el => el.type === hStat.type)?.value || 0;
          }
          let homePercent = 0;
          let awayPercent = 0;

          if (typeof hStat.value === 'string') {
            homePercent = parseInt(hStat.value);
            awayPercent = typeof aStatValue === 'string' ? parseInt(aStatValue) : aStatValue;
          } else {
            homePercent = !!hStat.value ? (hStat.value * 100) / hStat.value + (aStatValue as number) : 0;
            awayPercent = !!aStatValue ? ((aStatValue as number) * 100) / hStat.value + (aStatValue as number) : 0;
          }

          acc.push({
            type: hStat.type,
            home: hStat.value || 0,
            homePercent,
            away: aStatValue || 0,
            awayPercent,
          });

          return acc;
        },
        [] as {
          type: string;
          home: number | string;
          away: number | string;
          homePercent: number;
          awayPercent: number;
        }[],
      ),
    [homeStats, awayStats],
  );

  return statistics.map(({ type, home, away, homePercent, awayPercent }) => (
    <div key={type}>
      <p className="mb-1 flex justify-between">
        <span>{home}</span>
        <strong className="text-gray-600">{type}</strong>
        <span>{away}</span>
      </p>
      <span role="progressbar" className="mb-3 flex flex-row rounded-full bg-slate-200">
        <span className="mr-1 block h-4 rounded-full bg-green-700" style={{ width: `${homePercent}%` }}></span>
        <span className="ml-1 block h-4 rounded-full bg-gray-700" style={{ width: `${awayPercent}%` }}></span>
      </span>
    </div>
  ));
};
