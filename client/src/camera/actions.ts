import store from './store.js';
import CamVideo from './CamVideo';

export interface CamState {
  opened: string
}

export const fetchPopup = async () => {
  const res = await fetch('/api/cam-state');
  const camState = await res.json() as CamState;

  return store.dispatch({type: 'FETCH_POPUP', payload: camState.opened});
};

export const openPopup = (camVideo: CamVideo) => {
  camVideo.activateVideo();
  const { videoPopup } = store.dispatch({type: 'OPEN_POPUP', payload: camVideo.id});
  postCamState(videoPopup as CamState);

};

export const closePopup = (camVideo: CamVideo) => {
  camVideo.deactivateVideo();
  const { videoPopup } = store.dispatch({type: 'CLOSE_POPUP', payload: ''});
  postCamState(videoPopup as CamState);
};

function postCamState(camState: CamState) {
  fetch('/api/cam-state', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(camState)
  });
}