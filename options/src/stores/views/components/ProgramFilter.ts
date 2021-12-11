import { State, Action } from 'types/stores/views/components/ProgramFilter.d';

const initialState: State = {
  error: null,
  html: '',
  isLoading: false,
  textareaData: '',
  saveActorsCount: 0,
};
const programFilterReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_HTML':
      return { ...state, html: action.html };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_TEXTAREA':
      return { ...state, textareaData: action.textareaData };
    case 'SET_ACTORS_COUNT':
      return { ...state, saveActorsCount: action.saveActorsCount };
    default:
      return state;
  }
};

export default programFilterReducer;