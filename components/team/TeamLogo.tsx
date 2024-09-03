import { ImageProps } from 'next/image';

import { ClientImage } from '../ui';

interface ITeamLogoProps extends Omit<ImageProps, 'src' | 'alt'> {
  logo: string;
  name: string;
  size?: number;
}

export const TeamLogo = ({ logo, name, size }: ITeamLogoProps) => {
  return <ClientImage src={logo} fallbackSrc={'/icons/default-team.svg'} size={size} alt={`${name} team logotype`} />;
};
