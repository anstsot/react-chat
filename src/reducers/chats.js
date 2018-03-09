import * as types from '../constants';
import { combineReducers } from 'redux';

const initialState = {
  activeChat: '',
  allChats: [],
  myChats: [],
  chatList: {}
};

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
  allChats,
  myChats,
  chatList,
});

export const getChatId = (chat) => chat._id;
export const getChatsByIds = (state, ids) => ids.map(id => state.chatList[id]);
