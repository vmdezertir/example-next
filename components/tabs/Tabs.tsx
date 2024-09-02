'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { clsx } from 'clsx';

import { Icon } from '@/components/icon';

import styles from './styles.module.scss';
import type { TabProp, TabsProps } from './types';

export { TabsProps, TabProp };

export const Tabs = ({ tabName = 'tab', tabs, defaultTab }: TabsProps) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get(tabName) || defaultTab || tabs[0].tab;

  return (
    <div className={styles.tab_wrapper}>
      <nav className={styles.nav} aria-label="Tabs">
        {tabs.map(({ tab, title, icon, className }) => (
          <Link
            key={tab}
            href={{ query: { [tabName]: tab } }}
            className={clsx(styles.tab, activeTab === tab ? styles.tab_active : styles.tab_default, className || '')}
          >
            {icon && <Icon className="mr-2" name={icon} />}
            {title}
          </Link>
        ))}
      </nav>
    </div>
  );
};
