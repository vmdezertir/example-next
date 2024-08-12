import { cn } from '@/lib/utils';

import styles from './styles.module.scss';

interface ICircleNumberProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number | string;
}

export const CircleNumber = ({ value, className = '', ...props }: ICircleNumberProps) => {
  return (
    <div className={cn(styles.wrapper, 'border-green-600', className)} {...props}>
      {value}
    </div>
  );
};
