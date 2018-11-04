import { SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_ERROR } from './constants';

export const signInRequest = data => ({
  type: SIGN_IN_REQUEST,
  data,
});

export const signInSuccess = data => ({
  type: SIGN_IN_SUCCESS,
  data,
});

export const signInError = data => ({
  type: SIGN_IN_ERROR,
  data,
});
