import * as types from '../constants';
import { combineReducers } from 'redux';

const initialState = {
  isFetching: {
    singUp: false,
    login: false,
    recieveAuth: false,
    editProfile: false,
    allChats: false,
    myChats: false,
    chat: false,
    createChat: false,
    joinChat: false,
    leaveChat: false,
    deleteChat: false,
    sockets: false,
  },
  errors: {
    auth: null,
    chat: null,
  }
};

export const isFetching = (state = initialState.isFetching, action) => {
  switch (action.type) {
    case types.SIGNUP_REQUEST:
      return { ...state, singUp: true };
    case types.SIGNUP_FAILURE:
    case types.SIGNUP_SUCCESS:
      return { ...state, singUp: false };
    case types.LOGIN_REQUEST:
      return { ...state, login: true };
    case types.LOGIN_FAILURE:
    case types.LOGIN_SUCCESS:
      return { ...state, login: false };
    case types.RECIEVE_AUTH_REQUEST:
      return { ...state, recieveAuth: true };
    case types.RECIEVE_AUTH_FAILURE:
    case types.RECIEVE_AUTH_SUCCESS:
      return { ...state, recieveAuth: false };
    case types.EDIT_PROFILE_REQUEST:
      return { ...state, editProfile: true };
    case types.EDIT_PROFILE_FAILURE:
    case types.EDIT_PROFILE_SUCCESS:
      return { ...state, editProfile: false };
    case types.CHATS_REQUEST:
      return { ...state, allChats: true };
    case types.CHATS_FAILURE:
    case types.CHATS_SUCCESS:
      return { ...state, allChats: false };
    case types.MY_CHATS_REQUEST:
      return { ...state, myChats: true };
    case types.MY_CHATS_FAILURE:
    case types.MY_CHATS_SUCCESS:
      return { ...state, myChats: false };
    case types.GET_ACTIVE_CHAT_REQUEST:
      return { ...state, chat: true };
    case types.GET_ACTIVE_CHAT_FAILURE:
    case types.GET_ACTIVE_CHAT_SUCCESS:
      return { ...state, chat: false };
    case types.ADD_NEW_CHAT_REQUEST:
      return { ...state, createChat: true };
    case types.ADD_NEW_CHAT_FAILURE:
    case types.ADD_NEW_CHAT_SUCCESS:
      return { ...state, createChat: false };
    case types.JOIN_CHAT_REQUEST:
      return { ...state, joinChat: true };
    case types.JOIN_CHAT_FAILURE:
    case types.JOIN_CHAT_SUCCESS:
      return { ...state, joinChat: false };
    case types.LEAVE_CHAT_REQUEST:
      return { ...state, leaveChat: true };
    case types.LEAVE_CHAT_FAILURE:
    case types.LEAVE_CHAT_SUCCESS:
      return { ...state, leaveChat: false };
    case types.DELETE_CHAT_REQUEST:
      return { ...state, deleteChat: true };
    case types.DELETE_CHAT_FAILURE:
    case types.DELETE_CHAT_SUCCESS:
      return { ...state, deleteChat: false };
    case types.SOCKETS_CONNECTION_REQUEST:
      return { ...state, sockets: true };
    case types.SOCKETS_CONNECTION_FAILURE:
    case types.SOCKETS_CONNECTION_SUCCESS:
      return { ...state, sockets: false };
    default:
      return state;
  }
}

export const errors = (state = initialState.errors, action) => {
  switch (action.type) {
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
      return { ...state, auth: action.payload };
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return { ...state, auth: null };
    case types.CHATS_FAILURE:
    case types.MY_CHATS_FAILURE:
    case types.GET_ACTIVE_CHAT_FAILURE:
    case types.ADD_NEW_CHAT_FAILURE:
    case types.JOIN_CHAT_FAILURE:
    case types.LEAVE_CHAT_FAILURE:
    case types.DELETE_CHAT_FAILURE:
    case types.EDIT_PROFILE_FAILURE:
    case types.SOCKETS_CONNECTION_FAILURE:
      return { ...state, chat: action.payload };
    case types.CHATS_SUCCESS:
    case types.MY_CHATS_SUCCESS:
    case types.GET_ACTIVE_CHAT_SUCCESS:
    case types.ADD_NEW_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
    case types.LEAVE_CHAT_SUCCESS:
    case types.DELETE_CHAT_SUCCESS:
    case types.EDIT_PROFILE_SUCCESS:
    case types.SOCKETS_CONNECTION_SUCCESS:
      return { ...state, chat: null };
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  errors,
})