import { compose } from '@bem-react/core';
import { HouseEvent } from '../EventCards/EventCards';
import Base from './EventCard';
import { EventCardTypeCritical } from './_type/EventCard_type_critical';

export interface IEventCardProps extends HouseEvent {
  className: string
}

export const EventCard = compose(
  EventCardTypeCritical
)(Base);