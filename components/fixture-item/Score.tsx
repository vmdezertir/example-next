import { clsx } from 'clsx';
import { useMemo } from 'react';

import { isFixtureLive, isFixtureScheduled } from '@/lib/helpers';
import { EFixtureStatus, IFixtureStatus, IScores, ITeamsGoals } from '@/types';

interface IScoreInfoProps {
  status: IFixtureStatus;
  score?: IScores;
  goals?: ITeamsGoals;
}

export const ScoreInfo = ({ status, score, goals }: IScoreInfoProps) => {
  const withoutScore = useMemo(
    () =>
      isFixtureScheduled(status.short) ||
      [EFixtureStatus.CANC, EFixtureStatus.PST, EFixtureStatus.ABD].includes(status.short),
    [status],
  );
  const isLive = useMemo(() => isFixtureLive(status.short), [status]);

  if (withoutScore) {
    return <span className="whitespace-nowrap text-sm font-medium text-sky-600">-:-</span>;
  }

  return (
    <span className={clsx('whitespace-nowrap text-sm font-medium', isLive ? 'text-rose-600' : 'text-sky-600')}>
      {`${goals?.home || 0} : ${goals?.away || 0}`}
    </span>
  );
};
