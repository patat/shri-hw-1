export interface Action {
  type: string,
  payload?: any
}
export type State = { [key: string]: {} };
export type Reducer = (state: State, action: Action) => State;
export type Reducers = {[key: string]: Reducer};


let state: State = {}; 
let combinedReducer: Reducer;

function create(reducers: Reducers) {
  combinedReducer = (state: State, action: Action) => {
    let stateChanged = false;
    const nextState: State = {};

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

function dispatch(action: Action): State {
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