import mainMenu from '../main-menu.js';
import WidgetSlider from './WidgetSlider.js';
import CamVideo from './CamVideo.js';

interface CamAppState {
  camVideos: Array<CamVideo>
}

declare global {
  interface Window { 
    AudioContext: any
    webkitAudioContext: any
  }
}

export default function () {
  document.addEventListener('DOMContentLoaded', function () {
    mainMenu();

    const videos = [
      {
        id: 'video-1',
        url: 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8'
      },
      {
        id: 'video-2',
        url: 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8'
      },
      {
        id: 'video-3',
        url: 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8'
      },
      {
        id: 'video-4',
        url: 'http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8'
      }
    ];

    const state: CamAppState = {
      camVideos: []
    };

    const fullscreenVideoBG: HTMLElement = document.querySelector('.fullscreen-video__bg');
    const fullscreenVideoControls: HTMLElement = document.querySelector('.fullscreen-video__controls');
    const goBackBtn: HTMLElement = fullscreenVideoControls.querySelector('.fullscreen-video__back-btn');
    const volumeWidget: HTMLElement = fullscreenVideoControls.querySelector('.fullscreen-video__volume-level');
    const sliderBrightnessEl: HTMLElement = document.getElementById('slider-brightness');
    const sliderBrightness: WidgetSlider = new WidgetSlider(sliderBrightnessEl);
    const sliderContrastEl: HTMLElement = document.getElementById('slider-contrast');
    const sliderContrast: WidgetSlider = new WidgetSlider(sliderContrastEl);

    videos.forEach((video, index) => {
      const camVideo = new CamVideo(Object.assign({}, video, {
        bg: fullscreenVideoBG,
        controlPanel: fullscreenVideoControls,
        volumeWidget: volumeWidget,
        backBtn: goBackBtn,
        brightnessWidget: sliderBrightness,
        contrastWidget: sliderContrast
      }));

      const audioAnalizer = createAudioAnalizer(camVideo.el);
      camVideo.setAudioAnalizer(audioAnalizer);

      state.camVideos.push(camVideo);
    });
  });
}

function createAudioAnalizer (mediaEl: HTMLMediaElement) {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioCtx.createAnalyser();
  const source = audioCtx.createMediaElementSource(mediaEl);
  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = 32;

  return analyser;
}
