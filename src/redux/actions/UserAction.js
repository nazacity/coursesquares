import {SET_USER, CLEAR_USER, isSignIn, SET_LOADING} from '../types';

export const signIn = user => async dispatch => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
  return dispatch({
    type: isSignIn,
    payload: true,
  });
};

export const setUser = user => async dispatch => {
  dispatch({
    type: SET_USER,
    payload: user,
  });
};

export const signOut = () => async dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });

  dispatch({
    type: CLEAR_USER,
  });
  dispatch({
    type: isSignIn,
    payload: false,
  });
};
