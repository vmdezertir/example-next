import clsx from 'clsx';

import { Icon } from '@/components/icon';
import { EFixtureEventType, IFixtureEvent, ITeamPositionInfo } from '@/types';
import { IconName } from '@/types/name';

import { CircleNumber, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui';

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
    let iconName: IconName = 'ball';
    let className = '';
    switch (type) {
      case EFixtureEventType.Goal: {
        iconName = 'ball';
        className = '-top-3 -right-6';
        break;
      }

      case EFixtureEventType.Card: {
        const isRed = detail?.toLowerCase().includes('red');
        iconName = isRed ? 'red-card' : 'yellow-card';
        className = '-top-3 -left-6';
        break;
      }

      case EFixtureEventType.subst:
      case EFixtureEventType.Subst: {
        iconName = 'substitution';
        className = '-bottom-0 -right-6';
        break;
      }

      default:
        break;
    }

    return {
      iconName,
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
                <div key={`${type}_${detail}_${player.id}`}>
                  <Icon name={props.iconName} className={clsx('absolute h-[22px] w-[22px]', props.className)} />
                  {type === EFixtureEventType.Goal && count && count > 1 && (
                    <span className="absolute -right-14 -top-4 rounded-sm bg-lime-500 px-1 font-semibold text-white">{`x${count}`}</span>
                  )}
                </div>
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
