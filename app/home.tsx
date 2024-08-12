'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

import { DayFixtures } from '@/components/day-fixtures';
import { Tabs } from '@/components/tabs';
import { dayFixtureOptions } from '@/queryOptions/fixtures';
import { EFixtureTabStatus } from '@/types';

interface IHomePageProps {
  activeTab: EFixtureTabStatus;
}

export const HomePage = ({ activeTab }: IHomePageProps) => {
  const today = DateTime.utc().toFormat('yyyy-MM-dd');
  const { data } = useSuspenseQuery(dayFixtureOptions(today));

  const tabsData = useMemo(
    () => [
      { tab: 'all', title: 'All matches' },
      { tab: 'live', title: 'Live', iconName: 'radio' as keyof typeof dynamicIconImports, className: 'text-red-500' },
      { tab: 'finished', title: 'Finished' },
      { tab: 'scheduled', title: 'Scheduled' },
    ],
    [],
  );
  return (
    <div className="mx-auto h-full max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid h-full grid-cols-1 gap-4 transition-[grid-template-columns] lg:grid-cols-[120px_1fr] lg:gap-8 lg:[&:has(>*:first-child:hover)]:grid-cols-[160px_1fr]">
        <div className="h-full rounded-lg bg-gray-200"></div>
        <div className="h-full rounded-lg bg-gray-200 p-2">
          <Tabs tabName="status" tabs={tabsData} />
          <DayFixtures fixtures={data[activeTab]} sort={data.sortedList} />
        </div>
      </div>
    </div>
  );
};
