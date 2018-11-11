import React, { Component } from 'react';
import logo from './main-logo.svg';
import burger from './icon-burger.svg';
import './header.css';
import './main-menu.css';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <img src={logo} className="header__logo" alt="Яндекс Дом" />
        <div className="main-menu__burger clickable" touch-action="none">
          <img src={burger} className="main-menu__burger-icon" />
        </div>
        <div className="main-menu__container main-menu__container--hiding main-menu__container--hidden">
          <nav className="main-menu main-menu--hidden">
            <div className="main-menu__item main-menu__item--active"><a className="main-menu__link" href="#">События</a></div>
            <div className="main-menu__item"><a className="main-menu__link" href="#">Сводка</a></div>
            <div className="main-menu__item"><a className="main-menu__link" href="#">Устройства</a></div>
            <div className="main-menu__item"><a className="main-menu__link" href="#">Сценарии</a></div>
            <div className="main-menu__item"><a className="main-menu__link" href="camera.html">Видеонаблюдение</a></div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;