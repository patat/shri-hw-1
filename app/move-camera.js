export default function moveCamera(element) {
  const view = element.querySelector('.event-card__view');
  view.style.backgroundSize = `${view.clientWidth * 2}px ${view.clientHeight * 2}px`;
  view.style.backgroundPosition = '50% 50%';

  view.addEventListener('pointerdown', cameraMoveStart, true);
  view.addEventListener('pointermove', cameraMoveProgress, true);
  view.addEventListener('pointerup', cameraMoveEnd, true);
  view.addEventListener('pointercancel', cameraMoveEnd, true);

  const state = {
    tracking: false,
    prevPosition: 0,
    bgPosition: 50
  };

  function cameraMoveStart(ev) {
    if (!state.tracking) {
      console.log('start');
      view.setPointerCapture(ev.pointerId);
      state.tracking = true;
      state.prevPosition = ev.clientX;
    }
  }

  function cameraMoveProgress(ev) {
    if (state.tracking) {
      console.log('progress');
      const currentPosition = ev.clientX;
      const delta = currentPosition - state.prevPosition;
      console.log(delta);
      let bgPosition = state.bgPosition + (delta * 100 / view.clientWidth);
      if (bgPosition <= 0) {
        bgPosition = 0;
      }
      if (bgPosition >= 100) {
        bgPosition = 100;
      }
      requestAnimationFrame(function() {
        view.style.backgroundPosition = `${bgPosition}% 50%`;
      });
      state.prevPosition = currentPosition;
      state.bgPosition = bgPosition;
    }
  }

  function cameraMoveEnd(ev) {
    if (state.tracking) {
      console.log('end');
      state.tracking = false;
    }
  }
}