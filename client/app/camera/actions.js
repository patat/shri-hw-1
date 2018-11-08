var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import store from './store.js';
export const fetchPopup = () => __awaiter(this, void 0, void 0, function* () {
    const res = yield fetch('/api/cam-state');
    const camState = yield res.json();
    store.dispatch({ type: 'FETCH_POPUP', payload: camState.opened });
});
export const openPopup = (camVideo) => __awaiter(this, void 0, void 0, function* () {
    const { videoPopup } = store.dispatch({ type: 'OPEN_POPUP', payload: camVideo.id });
    postCamState(videoPopup);
});
export const closePopup = (camVideo) => {
    const { videoPopup } = store.dispatch({ type: 'CLOSE_POPUP', payload: '' });
    postCamState(videoPopup);
};
function postCamState(camState) {
    return fetch('/api/cam-state', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(camState)
    });
}
