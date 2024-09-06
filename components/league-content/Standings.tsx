'use client';

import { useParams } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { leagueStandingOptions } from '@/queryOptions/leagues';

import { NoData } from '../no-data';
import { StatsChar } from '../stats-char';
import { Avatar, AvatarFallback, AvatarImage } from '../ui';

const LEVEL_UP_COLORS = ['border-sky-500', 'border-amber-500', 'border-green-500'];
const LEVEL_DOWN_COLORS = ['border-orange-500', 'border-red-500', 'border-red-900'];

type PossibleLevelDirectionType = 'up' | 'down';

interface IStandingsProps {
  season: number;
}

export const Standings = ({ season }: IStandingsProps) => {
  const { slug } = useParams();

  const { data } = useSuspenseQuery(leagueStandingOptions(Number(slug), season));

  if (!data?.league?.standings) {
    return <NoData withIcon />;
  }

  const standings = useMemo(() => data?.league?.standings || [[]], [data]);

  const colClass = 'w-full text-center';

  const levelDir = useMemo(
    () =>
      standings.map(s =>
        s.reduce(
          (acc, { rank, description }) => {
            if (!description) {
              return acc;
            }
            let level: PossibleLevelDirectionType = 'down';

            if (rank < s.length / 2) {
              level = 'up';
            }

            if (!acc[level]?.[description]) {
              acc[level][description] = Object.keys(acc[level]).length + 1;
            }

            return acc;
          },
          { up: {}, down: {} } as { [key in PossibleLevelDirectionType]: { [key: string]: number } },
        ),
      ),
    [standings],
  );

  return (
    <div className="flex w-full flex-shrink-0 snap-center items-center justify-center">
      <div className="flex w-full flex-col justify-between p-2">
        <div className="flex w-full p-1">
          <div className="w-1/12"></div>
          <div className="w-3/12"></div>
          <div className="flex w-6/12 justify-evenly">
            <StatsChar chart="M" explanation="Games Played" />
            <StatsChar chart="W" explanation="Wins" />
            <StatsChar chart="D" explanation="Draws" />
            <StatsChar chart="L" explanation="Losses" />
            <StatsChar chart="P" chartClass="font-bold" explanation="Points" />
            <StatsChar chart="GF" explanation="Goals For" />
            <StatsChar chart="GA" explanation="Goals Against" />
            <StatsChar chart="GD" explanation="Goal Difference" />
          </div>
          <div className="w-2/12 text-center">Form</div>
        </div>
        {standings.map((st, stIndex) =>
          st.map(({ team, rank, all, points, goalsDiff, form, description }, index) => (
            <div
              key={team.id}
              className={`flex w-full p-1 ${index % 2 === 0 ? 'bg-slate-200' : ''} ${!!description ? `border-l-4 ${rank < standings.length / 2} ? ${LEVEL_UP_COLORS[levelDir[stIndex].up[description] - 1]} : ${LEVEL_DOWN_COLORS[levelDir[stIndex].down[description] - 1]}` : ''}`}
            >
              <div className="flex w-1/12 items-center justify-center px-2">{rank}</div>
              <div className="flex w-3/12 items-center">
                <Avatar className="m-2 h-5 w-5">
                  <AvatarImage src={team.logo || ''} alt={`${team.name} logo`} />
                  <AvatarFallback>{team.name?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                {team.name}
              </div>
              <div className="flex w-6/12 items-center justify-center">
                <div className={colClass}>{all.played}</div>
                <div className={colClass}>{all.win}</div>
                <div className={colClass}>{all.draw}</div>
                <div className={colClass}>{all.lose}</div>
                <div className={`${colClass} font-bold`}>{points}</div>
                <div className={colClass}>{all.goals.for}</div>
                <div className={colClass}>{all.goals.against}</div>
                <div className={colClass}>{goalsDiff}</div>
              </div>
              <div className="flex w-2/12 items-center justify-center">
                {form
                  ?.split('')
                  .map((char, i) => (
                    <div
                      key={char + i}
                      className={`m-[1px] h-3 w-3 rounded-sm opacity-80 ${
                        char === 'L' ? 'bg-red-500' : char === 'D' ? 'bg-gray-500' : 'bg-green-500'
                      }`}
                    ></div>
                  ))}
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
};
