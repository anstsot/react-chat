import * as types from '../constants/auth';
import callApi from '../utils/call-api';

export function signup(username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.signUp) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SIGNUP_REQUEST,
    });

    return callApi(
      '/signup',
      undefined,
      { method: 'POST' },
      {
        username,
        password,
      },
    )
      .then((json) => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }

        localStorage.setItem('token', json.token);

        dispatch({
          type: types.SIGNUP_SUCCESS,
          payload: json,
        });
      })
      .catch(reason =>
        dispatch({
          type: types.SIGNUP_FAILURE,
          payload: reason,
        }));
  };
}

export function login(username, password) {
  return (dispatch, getState) => {
    const { isFetching } = getState().services;

    if (isFetching.signUp) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LOGIN_REQUEST,
    });

    return callApi(
      '/login',
      undefined,
      { method: 'POST' },
      {
        username,
        password,
      },
    )
      .then((json) => {
        if (!json.token) {
          throw new Error('Token has not been provided!');
        }

        localStorage.setItem('token', json.token);

        dispatch({
          type: types.LOGIN_SUCCESS,
          payload: json,
        });
      })
      .catch(reason =>
        dispatch({
          type: types.LOGIN_FAILURE,
          payload: reason,
        }));
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({
      type: types.LOGOUT,
    });
  };
}

export function recieveAuth() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.recieveAuth) {
      return Promise.resolve();
    }

    dispatch({
      type: types.RECIEVE_AUTH_REQUEST,
    });

    return callApi('/users/me', token)
      .then(json =>
        dispatch({
          type: types.RECIEVE_AUTH_SUCCESS,
          payload: json,
        }))
      .catch(reason =>
        dispatch({
          type: types.RECIEVE_AUTH_FAILURE,
          payload: reason,
        }));
  };
}
