import React, { Component } from 'react';
import './main-wrapper.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import MainSection from '../main-section/main-section';

class MainWrapper extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <MainSection />
        <Footer />
      </div>
    );
  }
}

export default MainWrapper;