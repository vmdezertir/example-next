import { ISeason } from '@/types';

import { TabsContent, TabsList, TabsTrigger } from '../ui';
import { Tabs } from '../ui';
import { Wrapper } from './Wrapper';

const tabs = ['standings', 'matches', 'teams'] as const;
export type LeagueTabType = (typeof tabs)[number];

interface ILeagueContentProps {
  season: ISeason;
}

export const LeagueContent = ({ season }: ILeagueContentProps) => {
  return (
    <div className="mt-2 w-full rounded-lg border-2 border-gray-100 bg-white p-2">
      <Tabs defaultValue="standings" className="w-full">
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger key={tab} value={tab}>
              {tab.replace(/^./, tab[0].toUpperCase())}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
          <TabsContent key={tab} value={tab} className="w-full py-2">
            <Wrapper tab={tab} season={season.year} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
