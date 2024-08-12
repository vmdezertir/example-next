import { useCallback, useMemo } from 'react';

import {
  EFixtureEventType,
  IFixtureEvent,
  IFixtureLineupTeamPlayer,
  IFixtureTeamLineup,
  ITeamPositionInfo,
} from '@/types';

import { Lineups } from '../lineups';
import { EventIcon } from './FixtureEvents';

interface IFixtureLineupsProps {
  lineups?: [IFixtureTeamLineup, IFixtureTeamLineup];
  events: IFixtureEvent[];
}

const SubstitutesList = ({
  events,
  substitutes,
}: {
  substitutes: IFixtureLineupTeamPlayer[];
  events: IFixtureEvent[];
}) => {
  const getPlayerEvents = useCallback(
    (playerId: number) =>
      Array.from(
        events
          .filter(({ player, assist }) => player.id === playerId || assist.id === playerId)
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
  return substitutes.map(({ player }) => {
    const events = getPlayerEvents(player.id);
    return (
      <div key={player.id} className="mt-1 flex flex-row">
        <p>
          {player.number}. <strong>{player.name}</strong> <em className="text-sm">(Position: {player.pos || '-'})</em>
        </p>
        {events.map((event, index) => (
          <div key={`${event.type}_${index}`} className="relative">
            <EventIcon type={event.type} detail={event.detail} />
            {event.count && event.count > 1 && (
              <span className="absolute -right-2 -top-2 text-black">{`x ${event.count}`}</span>
            )}
          </div>
        ))}
      </div>
    );
  });
};

export const FixtureLineups = ({ lineups, events }: IFixtureLineupsProps) => {
  if (!lineups) {
    return null;
  }

  const [homeTeam, awayTeam] = lineups;

  if (!homeTeam.startXI?.length || !awayTeam.startXI?.length) {
    return null;
  }

  const homeLineups = useMemo(() => {
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

  const awayLineups = useMemo(() => {
    const initialArr = new Array(awayTeam.formation.split('-').length + 1);

    return awayTeam.startXI
      .reduce(
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
      )
      .reverse();
  }, [awayTeam.startXI, awayTeam.formation]);

  return (
    <>
      <Lineups
        homeLineups={homeLineups}
        awayLineups={awayLineups}
        events={events}
        homeFormation={homeTeam.formation}
        awayFormation={awayTeam.formation}
      />
      <div className="px-2">
        <p className="mb-1 mt-4 text-center font-semibold text-gray-600">Coach:</p>
        <div className="flex w-full flex-row">
          <p className="w-1/2">{homeTeam.coach.name}</p>
          <p className="w-1/2">{awayTeam.coach.name}</p>
        </div>
        <p className="mb-1 mt-4 text-center font-semibold text-gray-600">Substitutes:</p>
        <div className="flex w-full flex-row">
          <div className="w-1/2">
            <SubstitutesList substitutes={homeTeam.substitutes} events={events} />
          </div>
          <div className="w-1/2">
            <SubstitutesList substitutes={awayTeam.substitutes} events={events} />
          </div>
        </div>
      </div>
    </>
  );
};
