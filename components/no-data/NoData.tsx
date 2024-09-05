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
    <div className={clsx('mt-2 flex items-center justify-center', className)}>
      {(icon || withIcon) && <Icon className="mr-2" name={icon || 'ball'} />}
      <h3 className="text-lg font-medium text-gray-900">{text}</h3>
    </div>
  );
};
