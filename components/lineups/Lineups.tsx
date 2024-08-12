import { useMemo } from 'react';

import { IFixtureTeamLineup, ITeamPositionInfo } from '@/types';

import { Player } from './Player';

const DICTIONARY_WIDTHS = {
  3: 'w-1/3',
  4: 'w-1/4',
  5: 'w-1/5',
  6: 'w-1/6',
};

interface IFixtureLineupsProps {
  lineups?: [IFixtureTeamLineup, IFixtureTeamLineup];
}

export const Lineups = ({ lineups }: IFixtureLineupsProps) => {
  if (!lineups) {
    return null;
  }

  const [homeTeam, awayTeam] = lineups;

  if (!homeTeam.startXI?.length || !awayTeam.startXI?.length) {
    return null;
  }

  const homeLineup = useMemo(() => {
    const initialArr = new Array(homeTeam.formation.split('-').length + 1);

    return homeTeam.startXI.reduce(
      (acc, { player }) => {
        const index = Number(player.grid?.split(':')[0]) - 1 || 0;

        if (!acc[index]) {
          // @ts-ignore
          acc[index] = [];
        }

        acc[index].push(player);

        return acc;
      },
      initialArr as [ITeamPositionInfo][],
    );
  }, [homeTeam.startXI, homeTeam.formation]);

  const awayLineup = useMemo(() => {
    const initialArr = new Array(awayTeam.formation.split('-').length + 1);

    return awayTeam.startXI.reduce(
      (acc, { player }) => {
        const index = Number(player.grid?.split(':')[0]) - 1 || 0;

        if (!acc[index]) {
          // @ts-ignore
          acc[index] = [];
        }

        acc[index].push(player);

        return acc;
      },
      initialArr as [ITeamPositionInfo][],
    );
  }, [awayTeam.startXI, awayTeam.formation]);

  return (
    <div
      className={`relative ml-auto mr-auto flex h-[600px] w-[900px] flex-row bg-[url('/field.svg')] bg-contain bg-no-repeat`}
    >
      <span className="absolute left-4 top-2 text-lg font-semibold text-white">{homeTeam.formation}</span>
      <span className="absolute right-4 top-2 text-lg font-semibold text-white">{awayTeam.formation}</span>
      <div className="flex h-full w-1/2 flex-row">
        {homeLineup.map((players, index) => (
          <div
            key={`home_row_${index}`}
            // @ts-ignore
            className={`flex ${DICTIONARY_WIDTHS[homeLineup.length]} flex-col items-center justify-around`}
          >
            {players.map(player => (
              <Player key={player.id} info={player} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex h-full w-1/2 flex-row">
        {awayLineup.reverse().map((players, index) => (
          <div
            key={`away_row_${index}`}
            // @ts-ignore
            className={`flex ${DICTIONARY_WIDTHS[awayLineup.length]} flex-col items-center justify-around`}
          >
            {players.map(player => (
              <Player key={player.id} info={player} isAway />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
