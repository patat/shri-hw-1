let state = {};
let combinedReducer;
function create(reducers) {
    combinedReducer = (state, action) => {
        let stateChanged = false;
        const nextState = {};
        for (const key in reducers) {
            const reducer = reducers[key];
            const prevStateVal = state[key];
            const nextStateVal = reducer(prevStateVal, action);
            nextState[key] = nextStateVal;
            if (nextStateVal !== state[key]) {
                stateChanged = true;
            }
        }
        return stateChanged ? nextState : state;
    };
}
function dispatch(action) {
    const nextState = combinedReducer(state, action);
    if (state !== nextState) {
        state = nextState;
    }
    console.log(state);
    return state;
}
export default {
    create,
    dispatch
};
