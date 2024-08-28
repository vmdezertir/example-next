import Link from 'next/link';

import { clsx } from 'clsx';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

import { IFootballFixtureResponse, ITeams } from '@/types';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui';

interface IFixtureInfoProps {
  fixtures: IFootballFixtureResponse[];
  teams: ITeams;
}

const RowElement = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return <div className={clsx('flex w-1/3 justify-center font-semibold', className)}>{children}</div>;
};

export const FixtureH2H = ({ fixtures, teams }: IFixtureInfoProps) => {
  if (!fixtures.length) {
    return null;
  }

  const h2hRes: number[] = useMemo(() => {
    return fixtures.reduce(
      (acc, { teams: fTeams }) => {
        if (!fTeams.home.winner && !fTeams.away.winner) {
          acc[1] = acc[1] + 1;
          return acc;
        }

        const winnerTeamId = fTeams.home.winner ? fTeams.home.id : fTeams.away.id;
        if (winnerTeamId === teams.home.id) {
          acc[0] = acc[0] + 1;
        } else {
          acc[2] = acc[2] + 1;
        }

        return acc;
      },
      [0, 0, 0],
    );
  }, [fixtures, teams.home.id]);

  return (
    <div className="mt-6 w-full">
      <p className="p-2">
        <strong className="text-lg">{`Last ${fixtures.length} matches`}</strong>
      </p>
      <div className="flex w-full flex-row">
        <div className="w-1/3 px-2">
          <div className="flex h-[145px] w-full flex-col justify-between rounded-lg bg-slate-300 px-2 py-4">
            <div className="flex w-full flex-row justify-around">
              <Avatar className="p-1">
                <AvatarImage src={teams.home.logo || ''} alt={`${teams.home.name} team logotype`} />
                <AvatarFallback>T1</AvatarFallback>
              </Avatar>
              <Avatar className="p-1">
                <AvatarImage src={teams.away.logo || ''} alt={`${teams.away.name} team logotype`} />
                <AvatarFallback>T2</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex w-full flex-row">
              {['Win', 'Draw', 'Lose'].map(name => (
                <RowElement key={name} className="text-gray-500">
                  {name}
                </RowElement>
              ))}
            </div>
            <div className="flex w-full flex-row">
              {h2hRes.map((val, index) => (
                <RowElement key={index}>{val}</RowElement>
              ))}
            </div>
          </div>
        </div>
        <div className="w-2/3 px-12">
          <Carousel>
            <CarouselContent>
              {fixtures.map(({ fixture, teams, goals }) => {
                return (
                  <CarouselItem key={fixture.id} className="basis-1/4">
                    <Link
                      href={`/fixture/${fixture.id}`}
                      className="flex aspect-square h-[145px] w-[160px] flex-col items-center justify-center rounded-lg bg-slate-200 p-2"
                    >
                      <div className="flex w-full flex-row justify-between">
                        <span className={clsx(teams.home.winner && 'font-semibold')}>{teams.home.name}</span>
                        <span className={clsx(teams.home.winner && 'font-semibold')}>{goals.home}</span>
                      </div>
                      <div className="flex w-full flex-row justify-between">
                        <span className={clsx(teams.away.winner && 'font-semibold')}>{teams.away.name}</span>
                        <span className={clsx(teams.away.winner && 'font-semibold')}>{goals.away}</span>
                      </div>
                      <p className="mt-4 w-full text-gray-500">
                        {DateTime.fromISO(fixture.date).setLocale('en').toFormat('DD')}
                      </p>
                    </Link>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};
