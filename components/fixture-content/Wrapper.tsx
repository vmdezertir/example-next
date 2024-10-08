'use client';

import { useParams } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';

import { isFixtureLive } from '@/lib/helpers';
import { fixtureOptions } from '@/queryOptions/fixtures';

import { FixtureTabType } from './FixtureContent';
import { FixtureEvents } from './FixtureEvents';
import { FixtureInfo } from './FixtureInfo';
import { FixtureLineups } from './FixtureLineups';
import { FixturePlayers } from './FixturePlayers';
import { FixtureStats } from './FixtureStats';

interface IWrapperProps {
  tab: FixtureTabType;
}

export const Wrapper = ({ tab }: IWrapperProps) => {
  const { slug } = useParams();

  const { data } = useSuspenseQuery(fixtureOptions(Number(slug)));
  const { fixture, events, teams, statistics, lineups, players } = data;
  const isLive = isFixtureLive(fixture.status.short);

  switch (tab) {
    case 'info':
      return <FixtureInfo fixture={fixture} teams={teams} />;
    case 'events':
      return <FixtureEvents events={events} homeTeamId={teams.home.id} isLive={isLive} />;
    case 'statistics':
      return <FixtureStats stats={statistics} />;
    case 'lineups':
      return <FixtureLineups lineups={lineups} events={events} />;
    case 'players':
      return <FixturePlayers players={players} />;

    default:
      return null;
  }
};
