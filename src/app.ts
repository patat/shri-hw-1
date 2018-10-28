import mainMenu from './main-menu.js';
import lineClamp from './line-clamp.js';
import render from './render.js';
import initGestures from './initGestures.js';
import Camera from './Camera.js';

interface EventsData {
  events: Array<HouseEvent>
}

interface HouseEvent {
  type: string;
  title: string;
  source: string;
  time: string;
  icon: string;
  size: string;
  description?: string;
  data?: any
}

export default function app() {
  document.addEventListener('DOMContentLoaded', function() {
    mainMenu();

    fetch('events.json')
      .then((response: Response) => response.json())
      .then((data: EventsData) => render(data.events));

    // make further DOM munipulations async to pick up DOM changes
    setTimeout(() => {
      const cardHeadingsToClamp: NodeListOf<HTMLElement> = document.querySelectorAll('.line-clamp');
      cardHeadingsToClamp.forEach(cardHeading => lineClamp(cardHeading));

      const cameraEl: HTMLVideoElement = document.querySelector('.event-card__camera');
      const camera: Camera = new Camera(cameraEl);
      initGestures(
        camera.view, 
        (d: number) => camera.move(d), 
        (d: number) => camera.zoom(d),
        (d: number) => camera.brigtness(d)
      );
    }, 100);
    
  });
};