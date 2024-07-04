import dynamicIconImports from 'lucide-react/dynamicIconImports';

export type TabProp = {
  tab: string;
  title: string;
  iconName?: keyof typeof dynamicIconImports;
  className?: string;
};

export type TabsProps = {
  tabName?: string;
  defaultTab?: string;
  tabs: TabProp[];
};
