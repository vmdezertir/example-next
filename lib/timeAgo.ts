const { DateTime } = require('luxon');

function formatTimeUnit(value: number, unit: string) {
  return `${Math.floor(value)} ${unit}${Math.floor(value) > 1 ? 's' : ''} ago`;
}

export function timeAgo(dateString: string) {
  const now = DateTime.now();
  const pastDate = DateTime.fromISO(dateString);
  const diff = now.diff(pastDate, ['years', 'months', 'days', 'hours', 'minutes', 'seconds']);

  const units = [
    { unit: 'year', value: diff.years },
    { unit: 'month', value: diff.months },
    { unit: 'day', value: diff.days },
    { unit: 'hour', value: diff.hours },
    { unit: 'minute', value: diff.minutes },
    { unit: 'second', value: diff.seconds },
  ];

  for (const { unit, value } of units) {
    if (value > 0) {
      return formatTimeUnit(value, unit);
    }
  }

  return 'just now';
}
