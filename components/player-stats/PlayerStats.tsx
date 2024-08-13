import { FcRating } from 'react-icons/fc';
import { GiCaptainHatProfile } from 'react-icons/gi';

import { timeAgo } from '@/lib/timeAgo';
import { IFixtureTeamPlayersStat } from '@/types';

import { Avatar, AvatarFallback, AvatarImage, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui';

const StatChart = ({
  chart,
  explanation,
  children,
}: {
  chart?: string;
  explanation: string;
  children?: React.ReactElement;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="flex w-full items-center justify-center">
          <div>{chart || children || '-'}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{explanation}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface IPlayerStatsProps extends IFixtureTeamPlayersStat {}

export const PlayerStats = ({ players, team }: IPlayerStatsProps) => {
  if (!players || !players.length) {
    return null;
  }

  return (
    <div className="mb-4 w-full">
      <p className="p-2">
        <strong className="text-lg">{team.name}.</strong>
        <em className="text-sm text-gray-400">{` Data updated ${timeAgo(team.update)}`}</em>
      </p>
      <div className="flex w-full">
        <div className="flex w-full flex-shrink-0 snap-center items-center justify-center">
          <div className="flex w-full flex-col justify-between p-2">
            <div className="flex w-full p-1">
              <div className="flex w-4/12">
                <div className="flex w-1/5"></div>
                <div className="flex w-1/5"></div>
                <div className="flex w-3/5"></div>
              </div>
              <div className="flex w-8/12 justify-evenly">
                <StatChart chart="M" explanation="Minutes played" />
                <StatChart chart="G(P)" explanation="Goals Scored (from penalty)" />
                <StatChart chart="A" explanation="Assists" />
                <StatChart chart="SAV" explanation="Saves (penalty saves)" />
                <StatChart chart="P" explanation="Passes (accuracy)" />
                <StatChart chart="D" explanation="Duels (won)" />
                <StatChart chart="DR" explanation="Dribbles (success)" />
                <StatChart chart="YC" explanation="Yellow cards" />
                <StatChart chart="RC" explanation="Red card" />
                <StatChart chart="" explanation="Player rating">
                  <FcRating />
                </StatChart>
              </div>
            </div>
            {players.map(({ player, statistics }, index) => {
              const stat = statistics[0];

              return (
                <div
                  key={`${player.id}_${player.name}`}
                  className={`flex w-full p-1 ${index % 2 === 0 ? 'bg-slate-200' : ''}`}
                >
                  <div className="flex w-4/12">
                    <div className="flex w-1/5 items-center justify-center font-semibold">
                      {statistics[0].games.number}
                    </div>
                    <div className="flex w-1/5 py-1">
                      <Avatar>
                        <AvatarImage src={player.photo || ''} alt={`${player.name} photo`} />
                        <AvatarFallback>{player.name?.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex w-3/5 flex-col">
                      <p className="flex flex-row items-center">
                        {player.name}
                        {!!stat.games.captain && <GiCaptainHatProfile className="ml-2" style={{ color: '#d97604' }} />}
                      </p>
                      <p className="text-sm text-gray-400">Position: {stat?.games?.position}</p>
                    </div>
                  </div>
                  <div className="flex w-8/12 items-center justify-center">
                    <div className="w-full text-center text-sm">
                      {stat?.games?.minutes ? `${stat?.games?.minutes}'` : ''}
                    </div>
                    <div className="w-full text-center text-sm">{`${stat.goals.total || ''}${stat.penalty.scored ? ` (${stat.penalty.scored})` : ''}`}</div>
                    <div className="w-full text-center text-sm">{stat.goals.assists || ''}</div>
                    <div className="w-full text-center text-sm">{`${stat.goals.saves || ''}${stat.penalty.saved ? ` (${stat.penalty.saved})` : ''}`}</div>
                    <div className="w-full text-center text-sm">{`${stat.passes.total || ''}${stat.passes.accuracy ? ` (${stat.passes.accuracy}%)` : ''}`}</div>
                    <div className="w-full text-center text-sm">{`${stat.duels.total || ''}${stat.duels.won ? ` (${stat.duels.won})` : ''}`}</div>
                    <div className="w-full text-center text-sm">{`${stat.dribbles.attempts || ''}${stat.dribbles.success ? ` (${stat.dribbles.success})` : ''}`}</div>
                    <div className="w-full text-center text-sm">{stat.cards.yellow || ''}</div>
                    <div className="w-full text-center text-sm">{stat.cards.red || ''}</div>
                    <div className="w-full text-center font-semibold">{stat?.games?.rating || '-'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
