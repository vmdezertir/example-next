'use client';

import { useParams } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';

import { fixtureOptions } from '@/queryOptions/fixtures';

import { FixtureTabType } from './FixtureContent';
import { FixtureEvents } from './FixtureEvents';
import { FixtureInfo } from './FixtureInfo';
import { FixtureLineups } from './FixtureLineups';
import { FixtureStats } from './FixtureStats';

interface IWrapperProps {
  tab: FixtureTabType;
}

export const Wrapper = ({ tab }: IWrapperProps) => {
  const { slug } = useParams();

  const { data } = useSuspenseQuery(fixtureOptions(Number(slug)));
  const { fixture, events, teams, statistics, lineups } = data;

  switch (tab) {
    case 'info':
      return <FixtureInfo fixture={fixture} />;
    case 'events':
      return <FixtureEvents events={events} homeTeamId={teams.home.id} />;
    case 'statistics':
      return <FixtureStats stats={statistics} />;
    case 'lineups':
      return <FixtureLineups lineups={lineups} events={events} />;

    default:
      return null;
  }
};
