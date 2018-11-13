import React, { Component } from 'react';
import './Footer.css'

export default class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <nav className="Footer-Menu FooterMenu">
          <div className="FooterMenu-Item"><a href="#" className="FooterMenu-Link clickable">Помощь</a></div>
          <div className="FooterMenu-Item"><a href="#" className="FooterMenu-Link clickable">Обратная связь</a></div>
          <div className="FooterMenu-Item"><a href="#" className="FooterMenu-Link clickable">Разработчикам</a></div>
          <div className="FooterMenu-Item"><a href="#" className="FooterMenu-Link clickable">Условия использования</a></div>
          <div className="FooterMenu-Item"><a href="https://docviewer.yandex.ru/view/1130000031416166/?*=vmiIo4FS7IqUgcaWds3nn0wjc0V7InVybCI6InlhLXdpa2k6Ly93aWtpLWFwaS55YW5kZXgucnUvc2hyaS0yMDE4LWlpL2hvbWV3b3JrL2FkYXB0aXZuYWphLXZqb3JzdGthL2xpY2Vuc2UucGRmIiwidGl0bGUiOiJsaWNlbnNlLnBkZiIsInVpZCI6IjExMzAwMDAwMzE0MTYxNjYiLCJ5dSI6IjIyNjYxMTc3MzE1MzMyMjEwMzciLCJub2lmcmFtZSI6ZmFsc2UsInRzIjoxNTM4ODk5OTEyNTE4fQ%3D%3D" className="FooterMenu-Link clickable">Лицензия</a></div>
        </nav>
        <div className="Footer__copyright">© 2001–2017  ООО «Яндекс»</div>        
      </footer>
    );
  }
}