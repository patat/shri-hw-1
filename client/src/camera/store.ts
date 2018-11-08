export interface Action {
  type: string,
  payload?: any
}
export type State = { [key: string]: {} };
export type Reducer = (state: State, action: Action) => State;
export type Reducers = {[key: string]: Reducer};


declare  type CustomEventInit = {
  store: State
}



let state: State = {}; 
let combinedReducer: Reducer;
let targets: HTMLElement[] = [];

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

  emitStoreChange();
  return state;
}

function addTarget(target: HTMLElement) {
  if (!targets.some((el) => el === target)) {
    targets.push(target);
  }
}

function removeTarget(target: HTMLElement) {
  const index = targets.indexOf(target);
  if (index !== -1) {
    targets = targets.splice(index, 1);
  }
}

function emitStoreChange() {
  const stateClone: State = Object.assign({}, state);
  const event = new CustomEvent('storeChange', { detail: stateClone });
  targets.forEach(target => {
    target.dispatchEvent(event);
  });
}

export default {
  create,
  dispatch,
  addTarget,
  removeTarget
};