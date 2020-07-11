import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_SIGNUP,
  AUTH_SIGNUP_SUCCESS,
  AUTH_SIGNUP_FAILURE,
  AUTH_FETCH_USER,
  AUTH_FETCH_USER_SUCCESS,
  AUTH_FETCH_USER_FAILURE,
  AUTH_LOGOUT
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  isLoggedIn: false,
  error: null,
  user: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        loading: true,
        error: ""
        // user:action.payload
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload.user
      };

    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case AUTH_SIGNUP:
      return {
        ...state,
        loading: true,
        error: ""
        // user:action.payload
      };

    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user: action.payload.user
      };

    case AUTH_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case AUTH_FETCH_USER:
      return {
        ...state,
        loading: true
      };

    case AUTH_FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };

    case AUTH_FETCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };

    case AUTH_LOGOUT:
      localStorage.removeItem("user-token");

      return initialState;

    default:
      return state;
  }
};

export default auth;
