import dynamic from 'next/dynamic';

import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { memo } from 'react';

interface LucideIconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export const LucideIcon = memo(({ name, ...props }: LucideIconProps) => {
  const LucideBaseIcon = dynamic(dynamicIconImports[name]);

  return <LucideBaseIcon {...props} />;
});

export default LucideIcon;
