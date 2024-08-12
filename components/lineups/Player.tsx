import clsx from 'clsx';

import { ITeamPositionInfo } from '@/types';

import { CircleNumber, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui';

interface IPlayerProps {
  info: ITeamPositionInfo;
  isAway?: boolean;
}

export const Player = ({ info, isAway = false }: IPlayerProps) => {
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
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {info.number}. <strong>{info.name}</strong> <em className="text-sm">(Position: {info.pos})</em>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
