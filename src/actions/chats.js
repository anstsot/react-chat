import * as types from '../constants';
import callApi from '../utils/call-api';

export function getMyChats() {
  return (dispatch, getState) => {
    dispatch({
      type: types.MY_CHATS_REQUEST,
    });
    const { token } = getState().auth;

    return callApi('/chats/my', token)
    .then(json =>{
      dispatch({
        type: types.MY_CHATS_SUCCESS,
        payload: json,
      })
    })
    .catch(reason => dispatch({
      type: types.MY_CHATS_FAILURE,
      payload: reason,
    }));
  };
}

export function getAllChats() {
    return (dispatch, getState) => {
      dispatch({
        type: types.CHATS_REQUEST,
      });
      const { token } = getState().auth;
  
      return callApi('/chats', token)
      .then(json =>{
        dispatch({
          type: types.CHATS_SUCCESS,
          payload: json,
        })
      })
      .catch(reason => dispatch({
        type: types.CHATS_FAILURE,
        payload: reason,
      }));
    };
}

export function setActiveChat() {
    
}
