import { clsx } from 'clsx';

import { Icon, IconName } from '@/components/icon';

interface INoDataProps {
  icon?: IconName;
  text?: string;
  withIcon?: boolean;
  className?: string;
}

export const NoData = ({ text = 'No data available', icon, withIcon = false, className = '' }: INoDataProps) => {
  return (
    <div className={clsx('flex items-center justify-center', className)}>
      {(icon || withIcon) && <Icon className="mr-2" name={icon || 'ball'} />}
      <p>{text}</p>
    </div>
  );
};
