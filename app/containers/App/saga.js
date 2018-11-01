import { call, put, takeLatest } from 'redux-saga/effects';
import { getCurrentUserApi } from 'api/requests';
import { push } from 'connected-react-router';

import { setCurrentUserSuccess } from './actions';
import {
  GET_CURRENT_USER_REQUEST,
  LOGOUT_REQUEST,
  SET_CURRENT_USER,
} from './constants';

export function* getCurrentUser() {
  const response = yield call(getCurrentUserApi);
  yield call(setCurrentUser, { data: response.data });
}

export function* setCurrentUser(action) {
  yield put(setCurrentUserSuccess(action.data));
}

export function* logout() {
  localStorage.clear(),
  yield call(setCurrentUser, { data: null });
  window.location.replace('/sign_in')
}

export default function* appSaga() {
  yield takeLatest(GET_CURRENT_USER_REQUEST, getCurrentUser);
  yield takeLatest(SET_CURRENT_USER, setCurrentUser);
  yield takeLatest(LOGOUT_REQUEST, logout);
}
