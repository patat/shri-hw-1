import React, { Component } from 'react';
import './MainSection.css';
import EventCards from '../EventCards/EventCards';

class MainSection extends Component {
  render() {
    return (
      <section className="MainSection">
        <h1 className="MainSection-Heading">Лента событий</h1>
        <EventCards />
      </section>      
    );
  }
}

export default MainSection;