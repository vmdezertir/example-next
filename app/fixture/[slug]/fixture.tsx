'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { FixtureContent } from '@/components/fixture-content';
import { FixtureHeader } from '@/components/fixture-header';
import { fixtureOptions } from '@/queryOptions/fixtures';

interface IFixturePageProps {
  id: number;
}

export const FixturePage = ({ id }: IFixturePageProps) => {
  const { data } = useSuspenseQuery(fixtureOptions(id));

  return (
    <div className="mx-auto h-full max-w-screen-xl px-4 py-3">
      <div className="h-full rounded-lg bg-gray-200 p-4">
        <FixtureHeader goals={data.goals} fixture={data.fixture} teams={data.teams} league={data.league} />
        <FixtureContent />
      </div>
    </div>
  );
};
