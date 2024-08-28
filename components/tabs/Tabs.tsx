'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { clsx } from 'clsx';

import styles from './styles.module.scss';
import type { TabsProps } from './types';

export const Tabs = ({ tabName = 'tab', tabs, defaultTab }: TabsProps) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get(tabName) || defaultTab || tabs[0].tab;

  return (
    <div className={styles.tab_wrapper}>
      <nav className={styles.nav} aria-label="Tabs">
        {tabs.map(({ tab, title, IconComp, className }) => (
          <Link
            key={tab}
            href={{ query: { [tabName]: tab } }}
            className={clsx(styles.tab, activeTab === tab ? styles.tab_active : styles.tab_default, className || '')}
          >
            {IconComp && <IconComp className="mr-2" />}
            {title}
          </Link>
        ))}
      </nav>
    </div>
  );
};
