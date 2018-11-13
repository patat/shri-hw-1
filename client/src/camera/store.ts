export interface IAction {
  type: string;
  payload?: any;
}
export interface IState { [key: string]: {}; }
export type Reducer = (state: IState, action: IAction) => IState;
export interface IReducers { [key: string]: Reducer; }

let state: IState = {};
let combinedReducer: Reducer;
let targets: HTMLElement[] = [];

function create(reducers: IReducers) {
  combinedReducer = (prevState: IState, action: IAction) => {
    let stateChanged = false;
    const nextState: IState = {};

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

function dispatch(action: IAction): IState {
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
  const stateClone: IState = Object.assign({}, state);
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
