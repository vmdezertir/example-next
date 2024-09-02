import { clsx } from 'clsx';

import { Icon, IconName } from '@/components/icon';
import { EFixtureEventType, IFixtureEvent } from '@/types';

import { CircleNumber } from '../ui';
import styles from './event.styles.module.scss';

interface IFixtureEventsProps {
  events?: IFixtureEvent[];
  homeTeamId: number | null;
  isLive?: boolean;
}

export const EventIcon = ({ type, detail }: { type: EFixtureEventType; detail: string }) => {
  let iconName: IconName = 'ball';
  switch (type) {
    case EFixtureEventType.Goal: {
      iconName = 'ball';
      break;
    }

    case EFixtureEventType.Card: {
      const isRed = detail?.toLowerCase().includes('red');
      iconName = isRed ? 'red-card' : 'yellow-card';
      break;
    }

    case EFixtureEventType.subst:
    case EFixtureEventType.Subst: {
      iconName = 'substitution';
      break;
    }

    case EFixtureEventType.Var: {
      iconName = 'var';
      break;
    }

    default:
      break;
  }

  return <Icon className="mx-2 h-[22px] w-[22px]" name={iconName} />;
};

const EventTitle = ({ event }: { event: IFixtureEvent }) => {
  switch (event.type) {
    case EFixtureEventType.Goal: {
      return (
        <p>
          {`${event.player.name}`}
          {!!event.assist.name && <span className="text-gray-500">{` ( Asist: ${event.assist.name} )`}</span>}
        </p>
      );
    }

    case EFixtureEventType.Card: {
      return <p>{event.player.name}</p>;
    }

    case EFixtureEventType.subst:
    case EFixtureEventType.Subst: {
      return (
        <p>
          {`${event.assist.name}`}
          {!!event.player.name && <span className="text-gray-500">{` ( Out: ${event.player.name} )`}</span>}
        </p>
      );
    }

    case EFixtureEventType.Var: {
      return <p>{event.detail || event.comments || event.type}</p>;
    }

    default:
      return '';
  }
};

export const FixtureEvents = ({ events, homeTeamId, isLive = false }: IFixtureEventsProps) => {
  if (!events) {
    return null;
  }

  const list = isLive ? events?.reverse() : events;

  return list.map((event, indx) => {
    const isHome = event.team.id === homeTeamId;

    return (
      <div
        key={`${event.time.elapsed}_${event.time.extra}_${indx}`}
        className={clsx('grid', isHome ? 'justify-items-start' : 'justify-items-end')}
      >
        <div className={clsx(styles.row, isHome ? 'flex-row' : 'flex-row-reverse')}>
          <EventTitle event={event} />
          <EventIcon type={event.type} detail={event.detail} />
          <CircleNumber value={event.time.elapsed} />
        </div>
      </div>
    );
  });
};
