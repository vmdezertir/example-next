import Link from 'next/link';

import { Icon } from '@/components/icon';

import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className="bg-gray-50">
      <div className={styles.header}>
        <div className={styles.row}>
          <div className={styles.row_left}>
            <div className={styles.logo}>
              <Link href="/">
                <Icon name="logotype" className="h-[70px] w-[250px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
