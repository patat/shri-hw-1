import React, { Component } from 'react';
import './footer.css'

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <nav className="footer__menu footer-menu">
          <div className="footer-menu__item"><a href="#" className="footer-menu__link clickable">Помощь</a></div>
          <div className="footer-menu__item"><a href="#" className="footer-menu__link clickable">Обратная связь</a></div>
          <div className="footer-menu__item"><a href="#" className="footer-menu__link clickable">Разработчикам</a></div>
          <div className="footer-menu__item"><a href="#" className="footer-menu__link clickable">Условия использования</a></div>
          <div className="footer-menu__item"><a href="https://docviewer.yandex.ru/view/1130000031416166/?*=vmiIo4FS7IqUgcaWds3nn0wjc0V7InVybCI6InlhLXdpa2k6Ly93aWtpLWFwaS55YW5kZXgucnUvc2hyaS0yMDE4LWlpL2hvbWV3b3JrL2FkYXB0aXZuYWphLXZqb3JzdGthL2xpY2Vuc2UucGRmIiwidGl0bGUiOiJsaWNlbnNlLnBkZiIsInVpZCI6IjExMzAwMDAwMzE0MTYxNjYiLCJ5dSI6IjIyNjYxMTc3MzE1MzMyMjEwMzciLCJub2lmcmFtZSI6ZmFsc2UsInRzIjoxNTM4ODk5OTEyNTE4fQ%3D%3D" className="footer-menu__link clickable">Лицензия</a></div>
        </nav>
        <div className="footer__copyright">© 2001–2017  ООО «Яндекс»</div>        
      </footer>
    );
  }
}