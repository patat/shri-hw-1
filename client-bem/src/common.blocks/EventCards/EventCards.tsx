import React, { Component } from 'react';
import eventsData from './events.json';
import { EventCard } from '../EventCard';
import './EventCards.css';
import { cn } from '@bem-react/classname';
import { IMusicProps } from '../Music/Music';

export interface HouseEvent {
  type: string;
  title: string;
  source: string;
  time: string;
  icon: string;
  size: string;
  description?: string;
  data?: IMusicProps | {
    temperature: number,
    humidity: number
  } | {
    image: string
  } | {
    buttons: string[]
  } | any
}

export interface EventsData {
  events: HouseEvent[]
}

const cnEventCard = cn('EventCard');
const cnEventCards = cn('EventCards');

class EventCards extends Component {
  renderEventCards(data: EventsData) {
    return data.events.map(event => {
      const mixClassName = cnEventCards('Item', { size: event.size }, [cnEventCard()]);
      return <EventCard {...event} className={mixClassName} />
    });
  }

  render() {
    return (
      <div className={cnEventCards()}>
        { this.renderEventCards(eventsData as EventsData) }
      </div>
    );
  }
}

export default EventCards;