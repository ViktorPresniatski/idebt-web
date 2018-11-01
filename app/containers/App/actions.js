import {
  SET_CURRENT_USER,
  SET_CURRENT_USER_SUCCESS,
  GET_META_DATA_REQUEST,
  GET_META_DATA_SUCCESS,
  GET_CURRENT_USER_REQUEST,
  CHECK_TOKEN_REQUEST,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_ERROR,
  LOGOUT_REQUEST,
} from './constants';

export const setCurrentUser = data => ({
  type: SET_CURRENT_USER,
  data,
});

export const setCurrentUserSuccess = data => ({
  type: SET_CURRENT_USER_SUCCESS,
  data,
});

export const getMetaDataRequest = () => ({
  type: GET_META_DATA_REQUEST,
});

export const getMetaDataSuccess = data => ({
  type: GET_META_DATA_SUCCESS,
  data,
});

export const getCurrentUserRequest = () => ({
  type: GET_CURRENT_USER_REQUEST,
});

export const checkTokenRequest = data => ({
  type: CHECK_TOKEN_REQUEST,
  data,
});

export const checkTokenSuccess = () => ({
  type: CHECK_TOKEN_SUCCESS,
});

export const checkTokenError = () => ({
  type: CHECK_TOKEN_ERROR,
});

export const logoutRequest = () => ({
  type: LOGOUT_REQUEST,
});
