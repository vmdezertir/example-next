import { DateTime } from 'luxon';

import { isFixtureLive, isFixtureScheduled } from '@/lib/helpers';
import { EFixtureStatus, IFixtureStatus } from '@/types';

interface IStatusInfoProps {
  status: IFixtureStatus;
  date?: string;
  fullDate?: boolean;
}

export const StatusInfo = ({ status, date, fullDate }: IStatusInfoProps) => {
  const isLive = isFixtureLive(status.short);
  if (fullDate && !isLive) {
    return <span className="text-sky-600">{date ? DateTime.fromISO(date).toFormat('f') : '-'}</span>;
  }

  if (isFixtureScheduled(status.short)) {
    let mark = '';

    if (date) {
      mark = DateTime.fromISO(date).toFormat('HH:mm');
    }

    if (status.short === EFixtureStatus.TBD) {
      mark = `${mark} (${status.short})`;
    }

    return <span className="text-sky-600">{mark}</span>;
  }

  if (isLive) {
    return <span className="text-rose-600">{status.short}</span>;
  }

  return <span className="text-green-600">{status.short}</span>;
};
