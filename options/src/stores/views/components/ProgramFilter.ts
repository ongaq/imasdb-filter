import { State, Action } from 'types/stores/views/components/ProgramFilter.d';

const initialState: State = {
  error: null,
  html: '',
  isLoading: false,
  isSaved: null,
  textareaData: [],
  actorsCount: 0,
};
const programFilterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_HTML':
      return { ...state, html: action.html };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_SAVED':
      return { ...state, isSaved: action.isSaved };
    case 'SET_TEXTAREA':
      if (typeof action.textareaData === 'undefined') {
        return state;
      }
      return { ...state, textareaData: [ ...state.textareaData, ...action.textareaData] };
    case 'SET_ACTORS_COUNT':
      return { ...state, actorsCount: action.actorsCount };
    default:
      return state;
  }
};

export default programFilterReducer;