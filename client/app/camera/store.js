let state = {};
let combinedReducer;
let targets = [];
function create(reducers) {
    combinedReducer = (prevState, action) => {
        let stateChanged = false;
        const nextState = {};
        for (const key in reducers) {
            if (reducers.hasOwnProperty(key)) {
                const reducer = reducers[key];
                const prevStateVal = prevState[key];
                const nextStateVal = reducer(prevStateVal, action);
                nextState[key] = nextStateVal;
                if (nextStateVal !== state[key]) {
                    stateChanged = true;
                }
            }
        }
        return stateChanged ? nextState : prevState;
    };
}
function dispatch(action) {
    const nextState = combinedReducer(state, action);
    if (state !== nextState) {
        state = nextState;
    }
    emitStoreChange();
    return state;
}
function addTarget(target) {
    if (!targets.some((el) => el === target)) {
        targets.push(target);
    }
}
function removeTarget(target) {
    const index = targets.indexOf(target);
    if (index !== -1) {
        targets = targets.splice(index, 1);
    }
}
function emitStoreChange() {
    const stateClone = Object.assign({}, state);
    const event = new CustomEvent("storeChange", { detail: stateClone });
    targets.forEach((target) => {
        target.dispatchEvent(event);
    });
}
export default {
    create,
    dispatch,
    addTarget,
    removeTarget,
};
