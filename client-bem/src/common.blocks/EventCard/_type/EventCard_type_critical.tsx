import { withBemMod } from '@bem-react/core';
import { IEventCardProps } from '../index';

export const EventCardTypeCritical = withBemMod<IEventCardProps>(
  'EventCard',
  { type: 'critical' }
);