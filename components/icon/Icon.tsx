import { type SVGProps } from 'react';

import { cn } from '@/lib/utils';
import { type IconName } from '@/types/name';

export { IconName };

export function Icon({
  name,
  childClassName,
  className,
  children,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
  childClassName?: string;
}) {
  if (children) {
    return (
      <span className={cn(`font inline-flex items-center gap-1.5`, childClassName)}>
        <Icon name={name} className={className} {...props} />
        {children}
      </span>
    );
  }
  return (
    <svg {...props} className={cn('inline h-[1em] w-[1em] self-center', className)}>
      <use href={`/icons/sprite.svg#${name}`} />
    </svg>
  );
}
