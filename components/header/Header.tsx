import Image from 'next/image';
import Link from 'next/link';

import logotypeUrl from '../assets/logotype.svg?url';
import styles from './styles.module.scss';

export const Header = () => {
  return (
    <header className="bg-gray-50">
      <div className={styles.header}>
        <div className={styles.row}>
          <div className={styles.row_left}>
            <div className={styles.logo}>
              <Link href="/">
                <Image priority width={250} src={logotypeUrl} alt="company logo" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
