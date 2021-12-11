import { createStore, combineReducers } from 'redux';
import { State, Action } from 'types/stores/index';
import programFilterReducer from 'stores/views/components/ProgramFilter';

const initialState: State = {
  count: 0,
};

const countReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'INCREASE_COUNT':
      return { count: state.count + 1 };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  countReducer,
  programFilterReducer,
});
const store = createStore(rootReducer);

export default store;