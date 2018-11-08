/* global Hls requestAnimationFrame */
import { closePopup, fetchPopup, openPopup } from "./actions.js";
import store from "./store.js";
import WidgetSlider from "./WidgetSlider";

import { ICamState } from "./actions";
import { IAction, IState, Reducer, Reducers } from "./store";

export interface ICamVideoConfig {
  id: string;
  url: string;
  bg: HTMLElement;
  controlPanel: HTMLElement;
  volumeWidget: HTMLElement;
  backBtn: HTMLElement;
  brightnessWidget: WidgetSlider;
  contrastWidget: WidgetSlider;
}

export default class CamVideo {
  public id: string;
  public url: string;
  public el: HTMLVideoElement;
  public container: HTMLElement;
  public bg: HTMLElement;
  public controlPanel: HTMLElement;
  public volumeWidget: HTMLElement;
  public backBtn: HTMLElement;
  public brightness: number;
  public brightnessWidget: WidgetSlider;
  public contrast: number;
  public contrastWidget: WidgetSlider;
  public isFullscreen: boolean;
  public scale: number;
  public translateX: number;
  public translateY: number;
  public frequencyData: Uint8Array;
  public audioAnalizer: any;

  constructor(config: ICamVideoConfig) {
    this.id = config.id;
    this.url = config.url;
    this.el = document.querySelector(`#${this.id}`);
    this.container = this.el.parentElement;
    this.bg = config.bg;
    this.controlPanel = config.controlPanel;
    this.volumeWidget = config.volumeWidget;
    this.backBtn = config.backBtn;

    this.brightness = 1;
    this.brightnessWidget = config.brightnessWidget;

    this.contrast = 1;
    this.contrastWidget = config.contrastWidget;

    this._initStream();

    // video is in grid mode by default
    this.isFullscreen = false;

    // video is muted by default
    this.el.muted = true;

    // video element is fully rendered
    this.el.addEventListener("loadeddata", () => {
      this._updateTransformAmounts();
      fetchPopup();
    });

    // init open / close events
    this.el.addEventListener("click", () => openPopup(this));
    this.backBtn.addEventListener("click", () => closePopup(this));
    store.addTarget(this.el);
    this.el.addEventListener("storeChange", (ev: CustomEventInit<IState>) => {
      const state = ev.detail.videoPopup as ICamState;
      if (state.opened === this.id) {
        this.activateVideo();
      } else {
        this.deactivateVideo();
      }
    });
  }

  public _initStream() {
    // @ts-ignore
    if (Hls.isSupported()) {
      // @ts-ignore
      const hls = new Hls();
      hls.loadSource(this.url);
      hls.attachMedia(this.el);
      // @ts-ignore
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.el.play();
      });
    } else if (this.el.canPlayType("application/vnd.apple.mpegurl")) {
      this.el.setAttribute("src", this.url);
      this.el.addEventListener("loadedmetadata", () => {
        this.el.play();
      });
    }
  }

  public _updateTransformAmounts() {
    // transform amounts can be recalculated only in initial state
    if (this.isFullscreen) { return; }

    const boundingRect = this.el.getBoundingClientRect();
    const elRatio = boundingRect.width / boundingRect.height;
    const viewportRatio = window.innerWidth / window.innerHeight;
    const scaleX = window.innerWidth / boundingRect.width;
    const scaleY = window.innerHeight / boundingRect.height;

    this.scale = elRatio >= viewportRatio ? scaleX : scaleY;
    this.translateX = (window.innerWidth - boundingRect.width * this.scale) / 2 - boundingRect.left;
    this.translateY = (window.innerHeight - boundingRect.height * this.scale) / 2 - boundingRect.top;
  }

  public _initSliders() {
    this.brightnessWidget.setValue(this.brightness / 2);
    this.brightnessWidget.bindCallback((value: number) => {
      this.brightness = value * 2;
      this.el.style.filter = `brightness(${this.brightness}) contrast(${this.contrast})`;
    });

    this.contrastWidget.setValue(this.contrast / 2);
    this.contrastWidget.bindCallback((value: number) => {
      this.contrast = value * 2;
      this.el.style.filter = `brightness(${this.brightness}) contrast(${this.contrast})`;
    });
  }

  public activateVideo() {
    // can't expand fullscreen video
    console.log("activate");
    if (this.isFullscreen) { return; }

    this._expandToFullscreen();

    // unmute video
    // this.el.muted = false;
    this.isFullscreen = true;

    // this._visualizeVolume();
    this._initSliders();
  }

  public _expandToFullscreen() {
    // forbid page scroll
    document.body.style.position = "fixed";
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";

    console.log(this.container);
    this.container.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.scale})`;
    console.log(this.container);
    this.container.style.zIndex = "2005";
    this.bg.style.zIndex = "2000";
    this.bg.style.opacity = "1";

    // give it time to expand, than show control panel
    setTimeout(() => {
      console.log("expand");
      this.controlPanel.style.zIndex = "2010";
      this.controlPanel.style.opacity = "1";
    }, 500);
  }

  public deactivateVideo() {
    // video must be in fullscreen mode
    if (!this.isFullscreen) { return; }

    this._shrinkBackToGrid();
    // mute video
    this.el.muted = true;
    this.isFullscreen = false;
  }

  public _shrinkBackToGrid() {
    // release page scroll
    document.body.style.position = "";
    document.body.style.overflow = "";
    document.body.style.width = "";

    this.container.style.transform = "scale(1)";
    this.container.style.zIndex = "";
    this.bg.style.zIndex = "-1";
    this.bg.style.opacity = "0";
    this.controlPanel.style.zIndex = "-1";
    this.controlPanel.style.opacity = "0";
  }

  public setAudioAnalizer(analizer: any) {
    this.audioAnalizer = analizer;
    const bufferLength = this.audioAnalizer.frequencyBinCount;
    this.frequencyData = new Uint8Array(bufferLength);
  }

  public _visualizeVolume() {
    if (!this.isFullscreen) { return; }
    if (!this.audioAnalizer) { return; }
    this.audioAnalizer.getByteFrequencyData(this.frequencyData);
    const peakFrequency = Math.max.apply(null, this.frequencyData);
    const volumeLevelPercent = Math.floor(100 * peakFrequency / 255);

    this.volumeWidget.style.transform = `translateY(${100 - volumeLevelPercent}%)`;

    requestAnimationFrame(() => this._visualizeVolume());
  }
}
