import { createStore } from 'redux';
import { State, Action } from 'types/stores/index';

const initialState: State = {
  count: 0,
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};
const store = createStore(rootReducer);

export default store;