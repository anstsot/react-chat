import * as types from '../constants';
import { combineReducers } from 'redux';

const initialState = {
  activeChat: null,
  allChats: [],
  myChats: [],
  chatList: {}
};

const activeChat = (state = initialState.activeChat, action) => {
  switch (action.type) {
    case types.SET_ACTIVE_CHAT:
      return action.payload.chat;
    case types.UNSET_ACTIVE_CHAT:
      return null;
    default:
      return state;
  }
}

const allChats = (state = initialState.allChats, action) => {
  switch (action.type) {
    case types.CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    default:
      return state;
  }
}

const myChats = (state = initialState.myChats, action) => {
  switch (action.type) {
    case types.MY_CHATS_SUCCESS:
      return action.payload.chats.map(getChatId);
    default:
      return state;
  }
}

const chatList = (state = initialState.chatList, action) => {
  switch (action.type) {
    case types.CHATS_SUCCESS:
    case types.MY_CHATS_SUCCESS:
      return {
        ...state,
        ...action.payload.chats.reduce((ids, chat) => ({
          ...ids,
          [chat._id]: chat,
        }), {}),
      }
    default:
      return state;
  }
}

export default combineReducers({
  activeChat,
  allChats,
  myChats,
  chatList,
});

export const getChatId = (chat) => chat._id;
export const getChatsById = (state, id) => state.chatList[id];
export const getChatsByIds = (state, ids) => ids.map(id => state.chatList[id]);
