import * as types from '../constants';
import callApi from '../utils/call-api';
import { redirect } from './services';

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

export function getActiveChat(chatId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_ACTIVE_CHAT_REQUEST,
    });
    const { token } = getState().auth;

    return callApi(`/chats/${chatId}`, token)
    .then(json =>{
      dispatch({
        type: types.GET_ACTIVE_CHAT_SUCCESS,
        payload: json,
      })
      return json;
    })
    .catch(reason => dispatch({
      type: types.GET_ACTIVE_CHAT_FAILURE,
      payload: reason,
    }));
  };
}

export function setActiveChat(chatId) {
  return (dispatch) => {
    return dispatch(getActiveChat(chatId))
      .then(data => {
        if (!data) {
          dispatch({
            type: types.UNSET_ACTIVE_CHAT,
          });
        }
        dispatch({
          type: types.SET_ACTIVE_CHAT,
          payload: data,
        });
      })
  };
}

export function addNewChat(title) {
  return (dispatch, getState) => {
    dispatch({
      type: types.ADD_NEW_CHAT_REQUEST,
    });
    const { token } = getState().auth;

    return callApi('/chats', token, {method: 'POST'}, {data: {title: title}})
    .then(json =>{
      dispatch({
        type: types.ADD_NEW_CHAT_SUCCESS,
        payload: json,
      })
    })
    .catch(reason => dispatch({
      type: types.ADD_NEW_CHAT_FAILURE,
      payload: reason,
    }));

  };
}

export function joinChat(chatId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.JOIN_CHAT_REQUEST,
    });
    const { token } = getState().auth;

    return callApi(`/chats/${chatId}/join`, token)
    .then(json =>{
      dispatch({
        type: types.JOIN_CHAT_SUCCESS,
        payload: json,
      });
      dispatch(setActiveChat(chatId));
      return json.chat;
    })
    .catch(reason => dispatch({
      type: types.JOIN_CHAT_FAILURE,
      payload: reason,
    }));

  };
}

export function leaveChat(chatId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.LEAVE_CHAT_REQUEST,
    });
    const { token } = getState().auth;

    return callApi(`/chats/${chatId}/leave`, token)
    .then(json =>{
      dispatch({
        type: types.LEAVE_CHAT_SUCCESS,
        payload: json,
      });
      dispatch(setActiveChat(chatId));
      return json.chat;
    })
    .catch(reason => dispatch({
      type: types.LEAVE_CHAT_FAILURE,
      payload: reason,
    }));

  };
}

export function deleteChat(chatId) {
  return (dispatch, getState) => {
    dispatch({
      type: types.DELETE_CHAT_REQUEST,
    });
    const { token } = getState().auth;

    return callApi(`/chats/${chatId}`, token, {method: 'DELETE'})
    .then(json =>{
      dispatch({
        type: types.DELETE_CHAT_SUCCESS,
        payload: json,
      });
      dispatch({
        type: types.UNSET_ACTIVE_CHAT,
        payload: json,
      });
      dispatch(redirect('/chat'));
      return json.chat;
    })
    .catch(reason => dispatch({
      type: types.DELETE_CHAT_FAILURE,
      payload: reason,
    }));

  };
}
