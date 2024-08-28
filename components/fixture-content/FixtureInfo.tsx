import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { MdSports } from 'react-icons/md';
import { MdOutlineStadium } from 'react-icons/md';

import { fixtureH2hOptions } from '@/queryOptions/fixtures';
import { IFixture, ITeams } from '@/types';

import { FixtureH2H } from '../fixture-h2h';

interface IFixtureInfoProps {
  fixture: IFixture;
  teams: ITeams;
}

export const FixtureInfo = ({ fixture, teams }: IFixtureInfoProps) => {
  const h2hIds = useMemo(() => `${teams.home.id}-${teams.away.id}`, [teams]);
  const { data } = useSuspenseQuery(fixtureH2hOptions(h2hIds));

  return (
    <>
      <p className="mt-3 flex items-center self-start text-sm text-gray-400">
        <MdSports size={25} className="mr-1" />
        Referee: <strong className="ml-1 text-gray-600">{fixture.referee || '-'}</strong>
      </p>
      <p className="mt-3 flex items-center self-start text-start text-sm text-gray-400">
        <MdOutlineStadium size={25} className="mr-1" />
        Stadium:
        <strong className="ml-1 text-gray-600">
          {fixture.venue ? `${fixture.venue.name} (${fixture.venue.city})` : '-'}
        </strong>
      </p>
      <FixtureH2H fixtures={data} teams={teams} />
    </>
  );
};
