import * as types from '../constants';

const token = localStorage.getItem('token');

const initialState = {
  isAuthenticated: !!token,
  user: {},
  token,
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case types.SIGNUP_SUCCESS:
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case types.RECIEVE_AUTH_SUCCESS:
    case types.EDIT_PROFILE_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case types.SIGNUP_FAILURE:
    case types.LOGIN_FAILURE:
    case types.RECIEVE_AUTH_FAILURE:
    case types.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: '',
      };
    default:
      return state;
  }
}

