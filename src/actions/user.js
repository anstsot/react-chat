import * as types from '../constants';
import callApi from '../utils/call-api';

// eslint-disable-next-line
export function editProfile(data) {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if (isFetching.editProfile) {
      return Promise.resolve();
    }

    dispatch({
      type: types.EDIT_PROFILE_REQUEST,
    });

    return callApi('/users/me', token, { method: 'POST' }, { data: { ...data } })
      .then((json) => {
        dispatch({
          type: types.EDIT_PROFILE_SUCCESS,
          payload: json,
        });
      })
      .catch(reason => dispatch({
        type: types.EDIT_PROFILE_FAILURE,
        payload: reason,
      }));
  };
}
