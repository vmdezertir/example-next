import { clsx } from 'clsx';

import { EFixtureEventType, IFixtureEvent } from '@/types';

import ballIconPath from '../assets/ball.svg?url';
import redCardIconPath from '../assets/red-card.svg?url';
import substIconPath from '../assets/substitution.svg?url';
import varIconPath from '../assets/var.svg?url';
import yellowCardIconPath from '../assets/yellow-card.svg?url';
import { CircleNumber, ClientImage } from '../ui';
import styles from './event.styles.module.scss';

interface IFixtureEventsProps {
  events?: IFixtureEvent[];
  homeTeamId: number;
}

export const EventIcon = ({ type, detail }: { type: EFixtureEventType; detail: string }) => {
  let iconPath = '';
  switch (type) {
    case EFixtureEventType.Goal: {
      iconPath = ballIconPath;
      break;
    }

    case EFixtureEventType.Card: {
      const isRed = detail?.toLowerCase().includes('red');
      iconPath = isRed ? redCardIconPath : yellowCardIconPath;
      break;
    }

    case EFixtureEventType.subst:
    case EFixtureEventType.Subst: {
      iconPath = substIconPath;
      break;
    }

    case EFixtureEventType.Var: {
      iconPath = varIconPath;
      break;
    }

    default:
      break;
  }

  return <ClientImage className="mx-2" src={iconPath} size={22} alt={`${type} icon`} fallbackSrc={''} />;
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

export const FixtureEvents = ({ events, homeTeamId }: IFixtureEventsProps) => {
  return events.map((event, indx) => {
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
