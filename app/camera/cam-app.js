import mainMenu from '../main-menu.js';
import WidgetSlider from './WidgetSlider.js';

export default function() {
  document.addEventListener('DOMContentLoaded', function() {
    mainMenu();
    console.log('it works!');
    
    function initVideo(video, url) {
        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
            video.addEventListener('loadedmetadata', function () {
                video.play();
            });
        }
    }

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

    const state = {
        videos: [],
        isFullscreen: false,
        currentVideo: null,
        currentVideoIndex: null,
        brightness: [],
        contrast: [],
        analysers: []
    };

      const fullscreenVideoBG = document.querySelector('.fullscreen-video__bg');
      const fullscreenVideoControls = document.querySelector('.fullscreen-video__controls');
      const goBackBtn = fullscreenVideoControls.querySelector('.fullscreen-video__back-btn');
      const volumeLevel = fullscreenVideoControls.querySelector('.fullscreen-video__volume-level');

    videos.forEach((video, index) => {
        const videoEl = document.getElementById(video.id);
        initVideo(videoEl, video.url);
        
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        const source = audioCtx.createMediaElementSource(videoEl);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 32;

        state.videos.push(videoEl);
        state.analysers.push(analyser);
        state.brightness.push(1);
        state.contrast.push(1);

        videoEl.addEventListener('click', expandToFullscreen);
    });

    goBackBtn.addEventListener('click', cancelFullscreen);


    function expandToFullscreen(ev) {
      
        const elRect = ev.target.getBoundingClientRect();

        const elRatio = elRect.width / elRect.height;
        const viewportRatio = window.innerWidth / window.innerHeight;
        const scaleX = window.innerWidth / elRect.width;
        const scaleY = window.innerHeight / elRect.height;
        const scale = elRatio >= viewportRatio ? scaleX : scaleY;
        const translateX = ( window.innerWidth - elRect.width * scale ) / 2 - elRect.left;
        const translateY = ( window.innerHeight - elRect.height * scale ) / 2 - elRect.top;

        if (!state.isFullscreen) {
            state.currentVideo = ev.target;
            state.currentVideoIndex = state.videos.findIndex(video => video === ev.target);
            ev.target.parentNode.style = `transform: translate(${translateX}px, ${translateY}px) scale(${scale}); z-index: 2005;`;
            fullscreenVideoBG.style = `z-index: 2000; opacity: 1`;
            // fullscreenVideoEl.style = elRatio >= viewportRatio ? `width: 100%` : `height: 100%`;
            // const currVideoId = ev.target.getAttribute('id');
            // const currVideoUrl = (videos.find(video => video.id === currVideoId) || {}).url;
            // console.log(currVideoUrl);
            // initVideo(fullscreenVideoEl, currVideoUrl);
            
            setTimeout(() => {
                // state.currentVideo.classList.remove('video-preview');
                // state.currentVideo.style = elRatio >= viewportRatio ? `width: 100%` : `height: 100%`;
                // fullscreenVideo.appendChild(state.currentVideo);
                fullscreenVideoControls.style = `z-index: 2010; opacity: 1`;
            }, 500);

            const sliderBrightnessEl = document.getElementById('slider-brightness');
            const sliderBrightness = new WidgetSlider(sliderBrightnessEl, function(value) {
                state.brightness[state.currentVideoIndex] = value * 2;
                state.currentVideo.style.filter = `brightness(${state.brightness[state.currentVideoIndex]}) contrast(${state.contrast[state.currentVideoIndex]})`;
            }, state.brightness[state.currentVideoIndex] / 2);

            const sliderContrastEl = document.getElementById('slider-contrast');
            const sliderContrast = new WidgetSlider(sliderContrastEl, function(value) {
                state.contrast[state.currentVideoIndex] = value * 2;
                state.currentVideo.style.filter = `brightness(${state.brightness[state.currentVideoIndex]}) contrast(${state.contrast[state.currentVideoIndex]})`;
            }, state.contrast[state.currentVideoIndex] / 2);

            state.currentVideo.muted = false;
            const analyser = state.analysers[state.currentVideoIndex];
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            let cnt = 0;
            function visualizeVolume() {
                analyser.getByteFrequencyData(dataArray);
                const peakFrequency = Math.max.apply( null, dataArray );

                const volumeLevelPercent =  Math.floor(100 * peakFrequency / 255);
                volumeLevel.style.transform = `translateY(${100 - volumeLevelPercent}%)`;

                if (cnt % 100 === 0) {
                    //console.log(volumeLevelPercent);
                }
                if (state.currentVideo) {
                    requestAnimationFrame(visualizeVolume);
                }
            }

            visualizeVolume();

            state.isFullscreen = true;
        }
      }
        
    function cancelFullscreen(ev) {
        state.currentVideo.parentNode.style = `transform: scale(1)`;
        fullscreenVideoBG.style = `z-index: -1; opacity: 0`;
        fullscreenVideoControls.style = `z-index: -1; opacity: 0`;
        state.currentVideo.muted = true;
        state.currentVideo = null;
        state.currentVideoIndex = null;
        state.isFullscreen = false;
    }


  });
}