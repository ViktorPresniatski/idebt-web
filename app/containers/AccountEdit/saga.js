import { call, put, takeLatest } from 'redux-saga/effects';
import { updateCurrentUserApi, updateCurrentUserPasswordApi } from 'api/requests';

import { setCurrentUser } from 'containers/App/actions';
import { CURRENT_USER_UPDATE_REQUEST, CURRENT_USER_UPDATE_PASSWORD_REQUEST } from './constants';

export function* currentUserUpdate(action) {
  const { data, handleErrors, handleSuccess } = action.data;

  try {
    const response = yield call(updateCurrentUserApi, data);
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* currentUserUpdatePassword(action) {
  const { data, handleErrors, handleSuccess } = action.data;

  try {
    const response = yield call(updateCurrentUserPasswordApi, data);
    yield call(handleSuccess);
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export default function* accountEdit() {
  yield takeLatest(CURRENT_USER_UPDATE_REQUEST, currentUserUpdate);
  yield takeLatest(CURRENT_USER_UPDATE_PASSWORD_REQUEST, currentUserUpdatePassword);
}
