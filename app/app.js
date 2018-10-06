import mainMenu from './main-menu.js';
import lineClamp from './line-clamp.js';
import render from './render.js';

export default function app() {
  document.addEventListener('DOMContentLoaded', function() {
    mainMenu();

    fetch('events.json')
      .then(response => response.json())
      .then(data => render(data.events));

    // make adding ellipsis async to pick up DOM changes
    setTimeout(() => {
      const cardHeadingsToClamp = document.querySelectorAll('.line-clamp');
      cardHeadingsToClamp.forEach(cardHeading => lineClamp(cardHeading));
    }, 0);
    
  });
};