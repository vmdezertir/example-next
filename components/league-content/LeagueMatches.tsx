import { useParams } from 'next/navigation';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { leagueFixturesOptions } from '@/queryOptions/fixtures';

import { FixtureItem } from '../fixture-item';

const ROUND_SHOW_SIZE = 2;

interface ILeagueMatchesProps {
  season: number;
}

export const LeagueMatches = ({ season }: ILeagueMatchesProps) => {
  const { slug } = useParams();

  const { data } = useSuspenseQuery(leagueFixturesOptions(Number(slug), season));

  const [showSize, setShowSize] = useState(ROUND_SHOW_SIZE);
  const [matches, setMatches] = useState(data.scheduled || {});
  const [sortable, setSortable] = useState(data.sortedList.slice(-Object.keys(data.scheduled).length));

  const selectHandler = useCallback(
    (value: string) => {
      const isResults = value === 'last';
      const matches = isResults ? data.finished : data.scheduled;
      const matchesSize = Object.keys(matches).length;

      setMatches(matches);
      const sortList = isResults
        ? data.sortedList.slice(0, matchesSize).reverse()
        : data.sortedList.slice(-matchesSize);
      setShowSize(ROUND_SHOW_SIZE);
      setSortable(sortList);
    },
    [data, setMatches, setSortable, setShowSize],
  );

  const showMoreHandler = useCallback(() => setShowSize(prevSize => prevSize + ROUND_SHOW_SIZE), [setShowSize]);

  return (
    <div>
      <Select defaultValue="next" onValueChange={selectHandler}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Choose type</SelectLabel>
            <SelectItem value="next">Fixtures</SelectItem>
            <SelectItem value="last">Results</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <ul className="mx-auto mt-3 w-full overflow-hidden bg-white shadow sm:rounded-md">
        {sortable.slice(0, showSize).map(round => {
          const roundMatches = matches[round];

          if (!roundMatches) return null;

          return (
            <li key={round} className="px-4 py-3 sm:px-6">
              <span className="flex items-center border-b pb-2 text-gray-600">{round}</span>
              <ul>
                {roundMatches.games.map(match => (
                  <FixtureItem key={match.fixture.id} data={match} />
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
      {sortable.length > showSize && (
        <Button className="mx-auto mt-2 block" onClick={showMoreHandler}>
          Show More
        </Button>
      )}
    </div>
  );
};
