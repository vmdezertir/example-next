import { IFixture } from '@/types';

interface IFixtureInfoProps {
  fixture: IFixture;
}

export const FixtureInfo = ({ fixture }: IFixtureInfoProps) => {
  return (
    <>
      <p className="mt-3 self-start text-sm text-gray-400">
        Referee: <strong className="text-gray-600">{fixture.referee || '-'}</strong>
      </p>
      <p className="mt-3 self-start text-start text-sm text-gray-400">
        Stadium:{' '}
        <strong className="text-gray-600">
          {fixture.venue ? `${fixture.venue.name} (${fixture.venue.city})` : '-'}
        </strong>
      </p>
    </>
  );
};
