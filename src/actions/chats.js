import * as types from '../constants';
import callApi from '../utils/call-api';
import { redirect } from './services';

export function getMyChats() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if ( isFetching.myChats ) {
      return Promise.resolve();
    }

    dispatch({
      type: types.MY_CHATS_REQUEST,
    });

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
      const state = getState();
      const { token } = state.auth;
      const { isFetching } = state.services;
  
      if ( isFetching.myChats ) {
        return Promise.resolve();
      }

      dispatch({
        type: types.CHATS_REQUEST,
      });
  
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
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if ( isFetching.chat ) {
      return Promise.resolve();
    }

    dispatch({
      type: types.GET_ACTIVE_CHAT_REQUEST,
    });

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
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if ( isFetching.createChat ) {
      return Promise.resolve();
    }

    dispatch({
      type: types.ADD_NEW_CHAT_REQUEST,
    });

    return callApi('/chats', token, {method: 'POST'}, {data: { title }})
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
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if ( isFetching.joinChat ) {
      return Promise.resolve();
    }

    dispatch({
      type: types.JOIN_CHAT_REQUEST,
    });

    return callApi(`/chats/${chatId}/join`, token)
    .then(json =>{
      dispatch({
        type: types.JOIN_CHAT_SUCCESS,
        payload: json,
      });
    })
    .catch(reason => dispatch({
      type: types.JOIN_CHAT_FAILURE,
      payload: reason,
    }));

  };
}

export function leaveChat(chatId) {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if ( isFetching.leaveChat ) {
      return Promise.resolve();
    }

    dispatch({
      type: types.LEAVE_CHAT_REQUEST,
    });

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
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if ( isFetching.deleteChat ) {
      return Promise.resolve();
    }

    dispatch({
      type: types.DELETE_CHAT_REQUEST,
    });

    return callApi(`/chats/${chatId}`, token, {method: 'DELETE'})
    .then(json =>{
      dispatch({
        type: types.DELETE_CHAT_SUCCESS,
        payload: json,
      });
      dispatch(redirect('/chat'));
    })
    .catch(reason => dispatch({
      type: types.DELETE_CHAT_FAILURE,
      payload: reason,
    }));

  };
}
