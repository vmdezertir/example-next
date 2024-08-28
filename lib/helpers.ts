import { EFixtureStatus } from '@/types';

export const isFixtureScheduled = (status: EFixtureStatus) => [EFixtureStatus.TBD, EFixtureStatus.NS].includes(status);
export const isFixtureLive = (status: EFixtureStatus) =>
  [
    EFixtureStatus.LIVE,
    EFixtureStatus['1H'],
    EFixtureStatus['2H'],
    EFixtureStatus.HT,
    EFixtureStatus.ET,
    EFixtureStatus.BT,
    EFixtureStatus.SUSP,
    EFixtureStatus.INT,
    EFixtureStatus.P,
  ].includes(status);

export const isFinished = (status: EFixtureStatus) =>
  ['FT', 'AET', 'PEN', 'PST', 'CANC', 'ABD', 'AWD', 'WO'].includes(status);
