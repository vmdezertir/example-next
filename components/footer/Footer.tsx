import Image from 'next/image';

import logoUrl from '../assets/logo.svg?url';
import { type IInfoLinkProps, InfoLink } from './InfoLink';
import styles from './styles.module.scss';

export const Footer = () => {
  const bts: IInfoLinkProps[] = [{ text: 'Terms & Conditions' }, { text: 'Privacy Policy' }];

  return (
    <footer className="bg-gray-50">
      <div className={styles.wrapper}>
        <div className="border-t border-gray-100 pt-6">
          <div className={styles.row}>
            <div className={styles.row_left}>
              <Image width={50} src={logoUrl} alt="company logo" />
              <p className="mt-4 text-sm text-gray-500">&copy; {new Date().getFullYear()} SportHub</p>
            </div>
            <div className={styles.row_right}>
              <span className="block sm:inline">{`All rights reserved. `}</span>
              {bts.map((btn, indx) => (
                <>
                  <InfoLink key={btn.text} {...btn} />
                  {bts.length - 1 !== indx ? <span>{` • `}</span> : null}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
