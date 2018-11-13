import React, { Component } from 'react';
import burger from './icon-burger.svg';
import './Menu.css';
import { cn } from '@bem-react/classname';

const cnMenu = cn('Menu');

class Menu extends Component {
  render() {
    return (
      <div>
        <div className={cnMenu('Burger')} touch-action="none">
          <img src={burger} className={cnMenu('BurgerIcon')} />
        </div>
        <div className={cnMenu('Container', { hiding: true, hidden: true })}>
          <nav className={cnMenu({ hidden: true })}>
            <div className={cnMenu('Item', { active: true })}><a className={cnMenu('Link')} href="#">События</a></div>
            <div className={cnMenu('Item', { active: false })}><a className={cnMenu('Link')} href="#">Сводка</a></div>
            <div className={cnMenu('Item', { active: false })}><a className={cnMenu('Link')} href="#">Устройства</a></div>
            <div className={cnMenu('Item', { active: false })}><a className={cnMenu('Link')} href="#">Сценарии</a></div>
            <div className={cnMenu('Item', { active: false })}><a className={cnMenu('Link')} href="camera.html">Видеонаблюдение</a></div>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;