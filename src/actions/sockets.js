import SocketIOClient from 'socket.io-client';
import * as types from '../constants/sockets';
import { redirect } from './services';

export function missingSocketConnection() {
  return {
    type: types.SOCKETS_CONNECTION_MISSING,
  }
}

let socket = null;

export function socketConnect() {
  return (dispatch, getState) => {
    const state = getState();
    const { token } = state.auth;
    const { isFetching } = state.services;

    if ( isFetching.sockets ) {
      return Promise.resolve();
    }

    dispatch({
      type: types.SOCKETS_CONNECTION_REQUEST,
    });

    socket = SocketIOClient('ws://localhost:8000/', {
      query: { token },
    });

    socket.on('connect', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_SUCCESS,
      });
    });

    socket.on('error', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
      });
    });

    socket.on('connect_error', () => {
      dispatch({
        type: types.SOCKETS_CONNECTION_FAILURE,
      });
    });

    socket.on('new-message', (message) => {
      dispatch({
        type: types.RECIEVE_MESSAGE,
        payload: message,
      });
    });

    socket.on('new-chat', ({chat}) => {
      dispatch({
        type: types.RECIEVE_NEW_CHAT,
        payload: chat,
      });
    });

    socket.on('deleted-chat', ({chat}) => {
      const { activeChat } = getState().chat;

      dispatch({
        type: types.RECIEVE_DELETED_CHAT,
        payload: chat,
      });

      if ( activeChat._id === chat._id ) {
        dispatch(redirect('/chat'));
      }
    });
  }
}

export function sendMessage(content) {
  return (dispatch, getState) => {
    const { activeChat } = getState().chat;

    if (!socket) {
      dispatch(missingSocketConnection());
    }
    socket.emit('send-message', {
      chatId: activeChat._id,
      content,
    }, () => {
      dispatch({
        type: types.SEND_MESSAGE,
        payload: {
          chatId: activeChat._id,
          content,
        },
      })
    });
  }
}

export function mountChat(chatId) {
  return (dispatch, getState) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('mount-chat', chatId);
    dispatch({
      type: types.MOUNT_CHAT,
      payload: {chatId},
    })
  }
}

export function unmountChat(chatId) {
  return (dispatch, getState) => {
    if (!socket) {
      dispatch(missingSocketConnection());
    }

    socket.emit('unmount-chat', chatId);
    dispatch({
      type: types.UNMOUNT_CHAT,
      payload: {chatId},
    })
  }
}