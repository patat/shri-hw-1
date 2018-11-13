import React, { Component } from 'react';
import './MainWrapper.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MainSection from '../MainSection/MainSection';

class MainWrapper extends Component {
  render() {
    return (
      <div className="MainWrapper">
        <Header />
        <MainSection />
        <Footer />
      </div>
    );
  }
}

export default MainWrapper;