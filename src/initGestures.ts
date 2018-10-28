interface GestureState {
  events: Array<PointerEvent>;
  dragPosition: number | null;
  pinchDiff: number | null;
  rotateAngle: number | null;
  trackingPinch: boolean;
  trackingRotate: boolean;
  eventCnt: number;
  cumulativeDeltaAngle: number;
  cumulativeDeltaPinch: number;
}

interface Point {
  x: number;
  y: number;
}

export default function initGestures(element: HTMLElement, onDrag: Function, onPinch: Function, onRotate: Function) {
  // set to support pointer events with PEP
  element.setAttribute('touch-action', 'none');

  element.addEventListener('pointerdown', onPointerDown, true);
  element.addEventListener('pointermove', onPointerMove, true);
  element.addEventListener('pointerup', onPointerUp, true);
  element.addEventListener('pointercancel', onPointerUp, true);

    // debugging
  // const log = document.createElement('div');
  // element.appendChild(log);
  // log.textContent = 'hohoho';

  const state: GestureState = {
    events: [],
    dragPosition: null,
    pinchDiff: null,
    rotateAngle: null,
    trackingPinch: false,
    trackingRotate: false,
    eventCnt: 0,
    cumulativeDeltaAngle: 0,
    cumulativeDeltaPinch: 0
  };

  function onPointerDown(ev: PointerEvent) {
    state.events.push(ev);
    element.setPointerCapture(ev.pointerId);

    if (state.events.length === 2) {
      state.dragPosition = null;
    }
  }

  function onPointerMove(ev: PointerEvent) {
    updateEvent(ev);

    if (state.events.length === 1) {
      if (!state.dragPosition) {
        state.dragPosition = ev.clientX;
        return;
      }

      const dragDelta = state.dragPosition - ev.clientX;
      state.dragPosition = ev.clientX;

      onDrag(dragDelta);
    }

    if (state.events.length === 2) {
      let pinchDiffDelta = 0;
      let rotateAngleDelta = 0;

      if (!state.trackingRotate) {
       // Calculate the distance between the two pointers
       const x = Math.abs(state.events[0].clientX - state.events[1].clientX);
       const y = Math.abs(state.events[0].clientY - state.events[1].clientY);
       const curPinchDiff = Math.sqrt(x * x + y * y);

       if (state.pinchDiff && state.pinchDiff > 0) {
         pinchDiffDelta = curPinchDiff - state.pinchDiff;
       }

       // Cache the distance for the next move event 
       state.pinchDiff = curPinchDiff;
      }

      if (!state.trackingPinch) {
        // Calculate the angle between the two pointers
        const point1 = {
          x: state.events[0].clientX,
          y: state.events[0].clientY
        };
        const point2 = {
          x: state.events[1].clientX,
          y: state.events[1].clientY
        };
        const curAngle = calcAngle(point1, point2);

        if (state.rotateAngle) {
          rotateAngleDelta = curAngle - state.rotateAngle;
        }

        // Cache the angle for the next move event 
        state.rotateAngle = curAngle;
      }

      // Determine which gesture is it
      if (!state.trackingPinch && !state.trackingRotate) {
        //log.textContent = state.cumulativeDeltaAngle + ' ' + state.cumulativeDeltaPinch;
        if (state.eventCnt < 10) {
          state.eventCnt++;
          state.cumulativeDeltaAngle += Math.abs(rotateAngleDelta * 2);
          state.cumulativeDeltaPinch += Math.abs(pinchDiffDelta);
          return;
        }

        
        if (state.cumulativeDeltaPinch > state.cumulativeDeltaAngle) {
          state.trackingPinch = true;
          state.trackingRotate = false;
        }

        if (state.cumulativeDeltaAngle > state.cumulativeDeltaPinch) {
          state.trackingRotate = true;
          state.trackingPinch = false;
        }
      }

      if (state.trackingPinch) {
        onPinch(pinchDiffDelta);
      }

      if (state.trackingRotate) {
        onRotate(rotateAngleDelta);
      }
    }
  }

  function onPointerUp(ev: PointerEvent) {
    removeEvent(ev);

    if (state.events.length < 1) {
      state.dragPosition = null;
    }

    if (state.events.length < 2) {
      state.pinchDiff = null;
      state.rotateAngle = null;
      state.trackingPinch = false;
      state.trackingRotate = false;
      state.eventCnt = 0;
      state.cumulativeDeltaAngle = 0;
      state.cumulativeDeltaPinch = 0;
    }
  }

  function updateEvent(ev: PointerEvent) {
    for (var i = 0; i < state.events.length; i++) {
       if (state.events[i].pointerId == ev.pointerId) {
         state.events[i] = ev;
         break;
       }
     }
  }

  function removeEvent(ev: PointerEvent) {
    for (var i = 0; i < state.events.length; i++) {
       if (state.events[i].pointerId == ev.pointerId) {
         state.events.splice(i, 1);
         break;
       }
     }
  }

  function calcAngle(point1: Point, point2: Point) : number {
    const vec1 = {
      x: point2.x - point1.x,
      y: 0
    };
    const vec2 = {
      x: point2.x - point1.x,
      y: point2.y - point1.y
    };

    const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
    const tripleProduct = vec1.x * vec2.y - vec1.y * vec2.x;

    // in rad
    const angle = Math.atan2(tripleProduct, dotProduct);

    // in deg
    return angle * 180 / Math.PI;
  }
}