import { useParams } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';

import { leagueTeamsOptions } from '@/queryOptions/leagues';

import { TeamLogo } from '../team/TeamLogo';

interface ITeamsListProps {
  season: number;
}

export const TeamsList = ({ season }: ITeamsListProps) => {
  const { slug } = useParams();

  const { data } = useSuspenseQuery(leagueTeamsOptions(Number(slug), season));

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {data.map(team => (
        <div
          key={team.team.id}
          className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
        >
          <span className="inline-block rounded-lg bg-gray-50 p-3">
            <TeamLogo logo={team.team.logo} name={team.team.name || 'team'} />
          </span>

          <h2 className="mt-2 font-bold">{team.team.name}</h2>
          <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
            {team.venue.city} ({team.venue.name})
          </p>
        </div>
      ))}
    </div>
  );
};
