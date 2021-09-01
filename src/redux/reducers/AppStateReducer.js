import {
  setEnLng,
  setThLng,
  isSignIn,
  SET_LOADING,
  SET_SNACKBAR_DISPLAY,
  SET_SNACKBAR_DISMISS,
  SET_FULLSCREEN,
} from '../types';

const initialState = {
  isSignedIn: false,
  lang: 'th',
  isLoading: true,
  snackbar: {
    display: false,
    state: 'success',
    message: 'Ramble',
  },
  fullscreen: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case setEnLng:
      return {...state, lang: 'en'};
    case setThLng:
      return {...state, lang: 'th'};
    case isSignIn:
      return {...state, isSignedIn: action.payload};
    case SET_LOADING:
      return {...state, isLoading: action.payload};
    case SET_SNACKBAR_DISPLAY:
      return {
        ...state,
        snackbar: {
          display: true,
          state: action.payload.state,
          message: action.payload.message,
        },
      };
    case SET_SNACKBAR_DISMISS:
      return {...state, snackbar: {...state.snackbar, display: false}};
    case SET_FULLSCREEN:
      return {...state, fullscreen: action.payload};
    default:
      return state;
  }
};
