import * as types from '../constants';

const initialState = [];

export default function messages(state = initialState, action) {
  switch (action.type) {
    case types.RECIEVE_MESSAGE:
      return [...state, action.payload.message];
    case types.GET_ACTIVE_CHAT_SUCCESS:
      return action.payload.chat.messages;
    default:
      return state;
  }
}
