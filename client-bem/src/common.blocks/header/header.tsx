import React, { Component } from 'react';
import logo from './main-logo.svg';
import burger from './icon-burger.svg';
import './Header.css';
import { cn } from '@bem-react/classname';
import Menu from '../Menu/Menu';


const cnHeader = cn('Header');

class Header extends Component {
  render() {
    return (
      <header className={cnHeader()}>
        <img src={logo} className={cnHeader('Logo')} alt="Яндекс Дом" />
        <Menu />
      </header>
    );
  }
}

export default Header;