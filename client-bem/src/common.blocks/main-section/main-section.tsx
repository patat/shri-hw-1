import React, { Component } from 'react';
import './main-section.css';
import EventCards from '../event-cards/EventCards';

class MainSection extends Component {
  render() {
    return (
      <section className="main-section">
        <h1 className="main-section__heading">Лента событий</h1>
        <EventCards />
      </section>      
    );
  }
}

export default MainSection;