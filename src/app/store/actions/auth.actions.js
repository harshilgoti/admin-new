import history from "@history";
import axios from "config/axios";
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
} from "./actionTypes";

export const authLogin = payload => {
  return {
    type: AUTH_LOGIN,
    payload
  };
};
export const authLoginSuccess = payload => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload
  };
};
export const authLoginFailure = payload => {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload
  };
};
export const userLogin = (body, handleSignUpSuccess) => async dispatch => {
  dispatch(authLogin());
  axios
    .post(`/login`, body)
    .then(res => {
      dispatch(authLoginSuccess(res.data.data));
      localStorage.setItem("user-token", res.data.data.token);
      handleSignUpSuccess && handleSignUpSuccess();
    })
    .catch(error => {
      dispatch(authLoginFailure({ error: error.response.data.errors.message }));
    });
};

export const authSignUp = payload => {
  return {
    type: AUTH_SIGNUP,
    payload
  };
};
export const authSignUpSuccess = payload => {
  return {
    type: AUTH_SIGNUP_SUCCESS,
    payload
  };
};
export const authSignUpFailure = payload => {
  return {
    type: AUTH_SIGNUP_FAILURE,
    payload
  };
};
export const signUp = (body, handleSignUpSuccess) => async dispatch => {
  dispatch(authSignUp());

  axios
    .post(`/register`, body)
    .then(res => {
      dispatch(authSignUpSuccess(res.data.data));
      localStorage.setItem("user-token", res.data.data.token);
      handleSignUpSuccess && handleSignUpSuccess();
    })
    .catch(error => {
      console.error("error", error);
      dispatch(authSignUpFailure({ error: error.response.data.errors.message }));
    });
};

export const authFetchUser = payload => {
  return {
    type: AUTH_FETCH_USER,
    payload: payload
  };
};
export const authFetchUserSuccess = payload => {
  return {
    type: AUTH_FETCH_USER_SUCCESS,
    payload: payload
  };
};
export const authFetchUserFailure = payload => {
  return {
    type: AUTH_FETCH_USER_FAILURE,
    payload: payload
  };
};
export const fetchUser = () => async dispatch => {
  axios
    .get(`user-profile`)
    .then(res => {
      dispatch(authFetchUserSuccess(res.data.data));
    })
    .catch(error => {
      console.error("error", error);
      dispatch(authFetchUserFailure({ error: error.response.data.errors.message }));
    });
};

export const authLogout = payload => {
  return {
    type: AUTH_LOGOUT,
    payload: payload
  };
};
export const logout = user => async dispatch => {
  history.push({
    pathname: "/login"
  });

  dispatch(authLogout());
};
