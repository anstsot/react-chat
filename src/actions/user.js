import * as types from '../constants';
import callApi from '../utils/call-api';

export function editProfile(data) {
  return (dispatch, getState) => {
    dispatch({
      type: types.EDIT_PROFILE_REQUEST,
    });
    const { token } = getState().auth;

    return callApi('/users/me', token, {method: 'POST'}, {data: { ...data } })
    .then(json =>{
      dispatch({
        type: types.EDIT_PROFILE_SUCCESS,
        payload: json,
      })
    })
    .catch(reason => dispatch({
      type: types.EDIT_PROFILE_FAILURE,
      payload: reason,
    }));
  };
}
