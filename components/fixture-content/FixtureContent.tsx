import { TabsContent, TabsList, TabsTrigger } from '../ui';
import { Tabs } from '../ui';
import { Wrapper } from './Wrapper';
import styles from './styles.module.scss';

const tabs = ['info', 'events', 'statistics', 'lineups', 'players'] as const;
export type FixtureTabType = (typeof tabs)[number];

export const FixtureContent = () => {
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
          <TabsContent key={tab} value={tab} className="w-full py-2">
            <Wrapper tab={tab} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
