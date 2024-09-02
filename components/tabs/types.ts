import { type IconName } from '@/types/name';

export type TabProp = {
  tab: string;
  title: string;
  icon?: IconName;
  className?: string;
};

export type TabsProps = {
  tabName?: string;
  defaultTab?: string;
  tabs: TabProp[];
};
