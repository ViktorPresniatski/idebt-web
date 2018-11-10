import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_ERROR } from './constants';

export const signUpRequest = data => ({
  type: SIGN_UP_REQUEST,
  data,
});

export const signUpSuccess = data => ({
  type: SIGN_UP_SUCCESS,
  data,
});

export const signUpError = data => ({
  type: SIGN_UP_ERROR,
  data,
});
