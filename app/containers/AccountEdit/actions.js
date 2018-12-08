import {
  CURRENT_USER_UPDATE_REQUEST,
  CURRENT_USER_UPDATE_SUCCESS,
  CURRENT_USER_UPDATE_ERROR,
  CURRENT_USER_UPDATE_PASSWORD_REQUEST,
} from './constants';

export const currentUserUpdateRequest = data => ({
  type: CURRENT_USER_UPDATE_REQUEST,
  data,
});

export const currentUserUpdateSuccess = data => ({
  type: CURRENT_USER_UPDATE_SUCCESS,
  data,
});

export const currentUserUpdateError = data => ({
  type: CURRENT_USER_UPDATE_ERROR,
  data,
});

export const updateCurrentUserPasswordRequest = data => ({
  type: CURRENT_USER_UPDATE_PASSWORD_REQUEST,
  data
});
