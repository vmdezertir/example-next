import React, { useCallback } from 'react';

import { EFixtureEventType, IFixtureEvent, ITeamPositionInfo } from '@/types';

import { Player } from './Player';

const DICTIONARY_WIDTHS = {
  3: 'w-1/3',
  4: 'w-1/4',
  5: 'w-1/5',
  6: 'w-1/6',
};

interface IFixtureLineupsProps {
  homeLineups: [ITeamPositionInfo][];
  awayLineups: [ITeamPositionInfo][];
  homeFormation?: string;
  awayFormation?: string;
  events?: IFixtureEvent[];
}

export const Lineups = ({
  homeLineups,
  awayLineups,
  homeFormation,
  awayFormation,
  events = [],
}: IFixtureLineupsProps) => {
  const getPlayerEvents = useCallback(
    (playerId: number) =>
      Array.from(
        events
          .filter(
            ({ player, type }) =>
              player.id === playerId &&
              [
                EFixtureEventType.Goal,
                EFixtureEventType.Card,
                EFixtureEventType.Subst,
                EFixtureEventType.subst,
              ].includes(type),
          )
          .reduce((acc, event) => {
            const { type } = event;

            switch (type) {
              case EFixtureEventType.Goal: {
                if (acc.has(type)) {
                  const prevVal = acc.get(type);
                  acc.set(type, { ...event, count: prevVal.count + 1 });
                } else {
                  acc.set(type, { ...event, count: 1 });
                }

                return acc;
              }

              default: {
                acc.set(type, event);
                return acc;
              }
            }
          }, new Map())
          .values(),
      ),
    [events],
  );

  return (
    <div
      className={`relative ml-auto mr-auto flex h-[600px] w-[900px] flex-row bg-[url('/icons/field.svg')] bg-contain bg-no-repeat`}
    >
      {homeFormation && <span className="absolute left-4 top-2 text-lg font-semibold text-white">{homeFormation}</span>}
      {awayFormation && (
        <span className="absolute right-4 top-2 text-lg font-semibold text-white">{awayFormation}</span>
      )}

      <div className="flex h-full w-1/2 flex-row">
        {homeLineups.map((players, index) => (
          <div
            key={`home_row_${index}`}
            // @ts-expect-error: all formations are processed
            className={`flex ${DICTIONARY_WIDTHS[homeLineups.length]} flex-col items-center justify-around`}
          >
            {players.map(player => (
              <Player key={player.id} info={player} events={getPlayerEvents(player.id)} />
            ))}
          </div>
        ))}
      </div>
      <div className="flex h-full w-1/2 flex-row">
        {awayLineups.map((players, index) => (
          <div
            key={`away_row_${index}`}
            // @ts-expect-error: all formations are processed
            className={`flex ${DICTIONARY_WIDTHS[awayLineups.length]} flex-col items-center justify-around`}
          >
            {players.map(player => (
              <Player key={player.id} info={player} isAway events={getPlayerEvents(player.id)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
