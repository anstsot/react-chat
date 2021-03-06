/* eslint no-underscore-dangle: 0 */
/* eslint no-use-before-define: 0 */
import { combineReducers } from 'redux';
import * as types from '../constants';

const initialState = {
  activeChat: null,
  allChats: [],
  myChats: [],
  chatList: {},
};

const activeChat = (state = initialState.activeChat, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
    case types.JOIN_CHAT_SUCCESS:
      return action.payload.chat;
    case types.UNSET_ACTIVE_CHAT:
    case types.DELETE_CHAT_SUCCESS:
      return null;
    case types.RECIEVE_DELETED_CHAT:
      return state._id === getChatId(action.payload.chat) ? null : state;
    default:
      return state;
  }
};

const allChats = (state = initialState.allChats, action) => {
  switch (action.type) {
    case types.CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.ADD_NEW_CHAT_SUCCESS:
    case types.RECIEVE_NEW_CHAT:
      return [...state, getChatId(action.payload.chat)];
    case types.DELETE_CHAT_SUCCESS:
    case types.RECIEVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));
    default:
      return state;
  }
};

const myChats = (state = initialState.myChats, action) => {
  switch (action.type) {
    case types.MY_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    case types.ADD_NEW_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
      return [...state, getChatId(action.payload.chat)];
    case types.LEAVE_CHAT_SUCCESS:
    case types.DELETE_CHAT_SUCCESS:
    case types.RECIEVE_DELETED_CHAT:
      return state.filter(chatId => chatId !== getChatId(action.payload.chat));
    default:
      return state;
  }
};

const chatList = (state = initialState.chatList, action) => {
  switch (action.type) {
    case types.CHATS_SUCCESS:
    case types.MY_CHATS_SUCCESS:
      return {
        ...state,
        ...action.payload.chats.reduce(
          (ids, chat) => ({
            ...ids,
            [chat._id]: chat,
          }),
          {},
        ),
      };
    case types.ADD_NEW_CHAT_SUCCESS:
    case types.JOIN_CHAT_SUCCESS:
    case types.LEAVE_CHAT_SUCCESS:
    case types.RECIEVE_NEW_CHAT:
      return {
        ...state,
        [getChatId(action.payload.chat)]: action.payload.chat,
      };
    case types.DELETE_CHAT_SUCCESS:
    case types.RECIEVE_DELETED_CHAT: {
      const newState = { ...state };
      delete newState[getChatId(action.payload.chat)];
      return newState;
    }
    default:
      return state;
  }
};

export default combineReducers({
  activeChat,
  allChats,
  myChats,
  chatList,
});

export const getChatId = chat => chat._id;
export const getChatById = (state, id) => state.chatList[id];
export const getChatsByIds = (state, ids) => ids.map(id => state.chatList[id]);

export const isMember = (userId, chat) => {
  try {
    return chat.members.some(member => member._id === userId);
  } catch (e) {
    return false;
  }
};

export const isCreator = (userId, chat) => {
  try {
    return chat.creator._id === userId;
  } catch (e) {
    return false;
  }
};

export const isChatMember = (userId, chat) => isCreator(userId, chat) || isMember(userId, chat);
