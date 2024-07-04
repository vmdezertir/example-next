import Link from 'next/link';

import styles from './styles.module.scss';

export interface IInfoLinkProps {
  text: string;
  link?: string;
}

export const InfoLink = ({ text, link = '#' }: IInfoLinkProps) => {
  return (
    <Link href={link} className={styles.link}>
      {text}
    </Link>
  );
};
