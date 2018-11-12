import React, { Component } from 'react';
import logo from './main-logo.svg';
import burger from './icon-burger.svg';
import './Header.css';
import './MainMenu.css';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <img src={logo} className="Header-Logo" alt="Яндекс Дом" />
        <div className="MainMenu-Burger clickable" touch-action="none">
          <img src={burger} className="MainMenu-BurgerIcon" />
        </div>
        <div className="MainMenu-Container MainMenu-Container_hiding MainMenu-Container_hidden">
          <nav className="MainMenu MainMenu_hidden">
            <div className="MainMenu-Item MainMenu-Item--active"><a className="MainMenu-Link" href="#">События</a></div>
            <div className="MainMenu-Item"><a className="MainMenu-Link" href="#">Сводка</a></div>
            <div className="MainMenu-Item"><a className="MainMenu-Link" href="#">Устройства</a></div>
            <div className="MainMenu-Item"><a className="MainMenu-Link" href="#">Сценарии</a></div>
            <div className="MainMenu-Item"><a className="MainMenu-Link" href="camera.html">Видеонаблюдение</a></div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;