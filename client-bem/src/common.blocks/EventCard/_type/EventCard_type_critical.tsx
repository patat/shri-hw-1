import { withBemMod } from '@bem-react/core';
import { IEventCardProps } from '../index';
import './EventCard_type_critical.css';

export const EventCardTypeCritical = withBemMod<IEventCardProps>(
  'EventCard',
  { type: 'critical' }
);