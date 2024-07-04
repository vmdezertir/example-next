import { FixtureItem } from '../fixture-item';

export const DayFixtures = ({ status }) => {
  return (
    <ul className="mx-auto mt-3 w-full overflow-hidden bg-white shadow sm:rounded-md">
      <FixtureItem />
      <FixtureItem />
    </ul>
  );
};
