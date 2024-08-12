import { ImageProps } from 'next/image';

import fallBackUrl from '../assets/default-team.svg?url';
import { ClientImage } from '../ui';

interface ITeamLogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  logo: string;
  name: string;
  size?: number;
}

export const TeamLogo = ({ logo, name, size }: ITeamLogoProps) => {
  return <ClientImage src={logo} fallbackSrc={fallBackUrl} size={size} alt={`${name} team logotype`} />;
};
