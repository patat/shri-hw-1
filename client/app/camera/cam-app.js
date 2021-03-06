import mainMenu from "../main-menu.js";
import CamVideo from "./CamVideo.js";
import store from "./store.js";
import WidgetSlider from "./WidgetSlider.js";
export default function () {
    document.addEventListener("DOMContentLoaded", () => {
        mainMenu();
        store.create({
            videoPopup: (state, action) => {
                switch (action.type) {
                    case "FETCH_POPUP":
                        return { opened: action.payload };
                    case "OPEN_POPUP":
                        return { opened: action.payload };
                    case "CLOSE_POPUP":
                        return { opened: action.payload };
                    default:
                        return state;
                }
            },
        });
        const videos = [
            {
                id: "video-1",
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fsosed%2Fmaster.m3u8",
            },
            {
                id: "video-2",
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fcat%2Fmaster.m3u8",
            },
            {
                id: "video-3",
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fdog%2Fmaster.m3u8",
            },
            {
                id: "video-4",
                url: "http://localhost:9191/master?url=http%3A%2F%2Flocalhost%3A3102%2Fstreams%2Fhall%2Fmaster.m3u8",
            },
        ];
        const fullscreenVideoBG = document.querySelector(".fullscreen-video__bg");
        const fullscreenVideoControls = document.querySelector(".fullscreen-video__controls");
        const goBackBtn = fullscreenVideoControls.querySelector(".fullscreen-video__back-btn");
        const volumeWidget = fullscreenVideoControls.querySelector(".fullscreen-video__volume-level");
        const sliderBrightnessEl = document.getElementById("slider-brightness");
        const sliderBrightness = new WidgetSlider(sliderBrightnessEl);
        const sliderContrastEl = document.getElementById("slider-contrast");
        const sliderContrast = new WidgetSlider(sliderContrastEl);
        videos.forEach((video, index) => {
            const camVideo = new CamVideo(Object.assign({}, video, {
                bg: fullscreenVideoBG,
                controlPanel: fullscreenVideoControls,
                volumeWidget,
                backBtn: goBackBtn,
                brightnessWidget: sliderBrightness,
                contrastWidget: sliderContrast,
            }));
            const audioAnalizer = createAudioAnalizer(camVideo.el);
            camVideo.setAudioAnalizer(audioAnalizer);
        });
        // fetchPopup();
    });
}
function createAudioAnalizer(mediaEl) {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const source = audioCtx.createMediaElementSource(mediaEl);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 32;
    return analyser;
}
