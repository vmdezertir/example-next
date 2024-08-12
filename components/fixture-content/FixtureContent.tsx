import { useMemo } from 'react';

import { TabsContent, TabsList, TabsTrigger } from '../ui';
import { Tabs } from '../ui';
import { Wrapper } from './Wrapper';
import styles from './styles.module.scss';

export type FixtureTabType = 'info' | 'events' | 'statistics' | 'lineups';

export const FixtureContent = () => {
  const tabs: FixtureTabType[] = useMemo(() => ['info', 'events', 'statistics', 'lineups'], []);
  return (
    <div className={styles.header}>
      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          {tabs.map(tab => (
            <TabsTrigger key={tab} value={tab}>
              {tab.replace(/^./, tab[0].toUpperCase())}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map(tab => (
          <TabsContent key={tab} value={tab} className="w-full">
            <Wrapper tab={tab} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
