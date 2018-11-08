import ICamVideo from "./CamVideo";
import store from "./store.js";

export interface ICamState {
  opened: string;
}

export const fetchPopup = async () => {
  const res = await fetch("/api/cam-state");
  const camState = await res.json() as ICamState;

  store.dispatch({type: "FETCH_POPUP", payload: camState.opened});
};

export const openPopup = async (camVideo: ICamVideo) => {
  const { videoPopup } = store.dispatch({type: "OPEN_POPUP", payload: camVideo.id});

  postCamState(videoPopup as ICamState);
};

export const closePopup = (camVideo: ICamVideo) => {
  const { videoPopup } = store.dispatch({type: "CLOSE_POPUP", payload: ""});

  postCamState(videoPopup as ICamState);
};

function postCamState(camState: ICamState) {
  return fetch("/api/cam-state", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(camState),
  });
}
