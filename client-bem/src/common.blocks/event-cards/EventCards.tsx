import React, { Component } from 'react';
import eventsData from './events.json';
import EventCard from '../event-card/EventCard';
import './EventCards.css';

export interface HouseEvent {
  type: string;
  title: string;
  source: string;
  time: string;
  icon: string;
  size: string;
  description?: string;
  data?: any
}

export interface EventsData {
  events: HouseEvent[]
}

class EventCards extends Component {
  renderEventCards(data: EventsData) {
    return data.events.map(event => {
      const mixClassName = `event-cards__item_size_${event.size}`;
      return <EventCard {...event} mix={mixClassName} />
    });
  }

  render() {
    return (
      <div className="event-cards">
        { this.renderEventCards(eventsData as EventsData) }
      </div>
    );
  }
}

export default EventCards;