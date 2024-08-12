import clsx from 'clsx';

import { EFixtureEventType, IFixtureEvent, ITeamPositionInfo } from '@/types';

import ballIconPath from '../assets/ball.svg?url';
import redCardIconPath from '../assets/red-card.svg?url';
import substIconPath from '../assets/substitution.svg?url';
import yellowCardIconPath from '../assets/yellow-card.svg?url';
import { CircleNumber, ClientImage, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui';

interface IFixtureEventWithCount extends IFixtureEvent {
  count?: number;
}
interface IPlayerProps {
  info: ITeamPositionInfo;
  isAway?: boolean;
  events?: IFixtureEventWithCount[];
}

export const Player = ({ info, isAway = false, events = [] }: IPlayerProps) => {
  const getIconProps = (type: EFixtureEventType, detail: string) => {
    let iconPath = '';
    let className = '';
    switch (type) {
      case EFixtureEventType.Goal: {
        iconPath = ballIconPath;
        className = '-top-3 -right-6';
        break;
      }

      case EFixtureEventType.Card: {
        const isRed = detail?.toLowerCase().includes('red');
        iconPath = isRed ? redCardIconPath : yellowCardIconPath;
        className = '-top-3 -left-6';
        break;
      }

      case EFixtureEventType.subst:
      case EFixtureEventType.Subst: {
        iconPath = substIconPath;
        className = '-bottom-0 -right-6';
        break;
      }

      default:
        break;
    }

    return {
      icon: iconPath,
      className,
    };
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="relative cursor-pointer">
            <CircleNumber
              key={info.id}
              value={info.number}
              className={clsx('border-black bg-sky-500 text-white', isAway && 'bg-rose-500 text-white')}
            />
            <span className="absolute -bottom-6 -left-4 w-[80px] truncate text-slate-950">{info.name}</span>
            {events.map(({ type, detail, player, count }) => {
              const props = getIconProps(type, detail);
              return (
                <>
                  <ClientImage
                    key={`${type}_${detail}_${player.id}`}
                    className={clsx('absolute', props.className)}
                    src={props.icon}
                    size={22}
                    alt={`${type} icon`}
                    fallbackSrc={''}
                  />
                  {type === EFixtureEventType.Goal && count && count > 1 && (
                    <span className="absolute -right-12 -top-3 font-semibold text-white">{`x ${count}`}</span>
                  )}
                </>
              );
            })}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {info.number}. <strong>{info.name}</strong> <em className="text-sm">(Position: {info.pos || '-'})</em>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
