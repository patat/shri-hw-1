import mainMenu from './main-menu.js';
import lineClamp from './line-clamp.js';
import render from './render.js';
import moveCamera from './move-camera.js';

export default function app() {
  document.addEventListener('DOMContentLoaded', function() {
    mainMenu();

    fetch('events.json')
      .then(response => response.json())
      .then(data => render(data.events));

    // make further DOM munipulations async to pick up DOM changes
    setTimeout(() => {
      const cardHeadingsToClamp = document.querySelectorAll('.line-clamp');
      cardHeadingsToClamp.forEach(cardHeading => lineClamp(cardHeading));

      const camera = document.querySelector('.event-card__camera');
      moveCamera(camera);
    }, 10);
    
  });
};