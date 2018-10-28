export default class Camera {
  el: HTMLVideoElement
  view: HTMLElement
  zoomInfo: HTMLElement
  brightnessInfo: HTMLElement
  scrollbar: HTMLElement
  scroller: HTMLElement
  camPosition: number
  zoomValue: number
  brightness: number
  camImageWidth: number
  camImageHeight: number
  scrollbarWidth: number
  scrollerWidth: number


  constructor(el: HTMLVideoElement) {
    this.el = el;
    this.view = el.querySelector('.event-card__view');
    this.zoomInfo = el.querySelector('.event-card__zoom');
    this.brightnessInfo = el.querySelector('.event-card__brightness');

    // debugging
    // this.log = document.createElement('div');
    // el.appendChild(this.log);
    // this.log.textContent = 'hohoho';

    this.camPosition = 50; // horizontal position in % from 0 to 100 
    this.zoomValue = 2;  // x initial view element size
    this.brightness = 1;

    // setup camera image background
    this._resizeCamImage();
    this.view.style.backgroundPosition = `${this.camPosition}% 50%`;

    this._initScrollBar();
  }

  _resizeCamImage() {
    this.camImageWidth = this.view.clientWidth * this.zoomValue;
    this.camImageHeight = this.view.clientHeight * this.zoomValue;
    this.view.style.backgroundSize = `${this.camImageWidth}px ${this.camImageHeight}px`;
  }
  
  _initScrollBar() {
    this.scrollbar = this.view.querySelector('.event-card__scrollbar');
    this.scroller = this.view.querySelector('.event-card__scroller');
    this.scrollbarWidth = this.scrollbar.clientWidth - 2;
    this._initScroller();
    this._moveScroller();
  }

  _initScroller() {
    this.scrollerWidth = Math.floor(this.scrollbarWidth / this.zoomValue);
    this.scroller.style.width = `${this.scrollerWidth}px`;
  }

  _moveScroller() {
    const pos = (this.scrollbarWidth - this.scrollerWidth) * this.camPosition / 100;
    this.scroller.style.transform = `translateX(${pos}px)`;
  }

  _updateZoomInfo() {
    const zoomPercentage = Math.floor((this.zoomValue - 2) * 50);
    this.zoomInfo.textContent = `Приближение: ${zoomPercentage}%`;
  }

  _updateBrightness() {
    this.view.style.filter = `brightness(${this.brightness})`;
    this.brightnessInfo.textContent = `Яркость: ${Math.floor(this.brightness * 100)}%`;
  }
  
  move(delta) {
    //this.log.textContent = delta;
    let camPosition = this.camPosition - delta * 100 / this.view.clientWidth;
    if (camPosition <= 0) {
      camPosition = 0;
    }
    if (camPosition >= 100) {
      camPosition = 100;
    }

    this.camPosition = camPosition;

    requestAnimationFrame(() => {
      this.view.style.backgroundPosition = `${camPosition}% 50%`;
      this._moveScroller();
    });
  }

  zoom(delta) {
    //this.log.textContent = delta;
    let zoomValue = this.zoomValue + delta * 0.05;
    if (zoomValue <= 2) {
      zoomValue = 2;
    }
    if (zoomValue >= 4) {
      zoomValue = 4;
    }

    this.zoomValue = zoomValue;

    requestAnimationFrame(() => {
      this._resizeCamImage();
      this._initScroller();
      this._moveScroller();
      this._updateZoomInfo();
    });
  }

  brigtness(delta) {
    //this.log.textContent = delta;
    let brightnessValue = this.brightness + delta * 0.05;
    if (brightnessValue <= 0.5) {
      brightnessValue = 0.5;
    }
    if (brightnessValue >= 1.5) {
      brightnessValue = 1.5;
    }

    this.brightness = brightnessValue;

    requestAnimationFrame(() => {
      this._updateBrightness();
    });
  }
}