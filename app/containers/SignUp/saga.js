import { call, put, takeLatest } from 'redux-saga/effects';
import { signUpApi } from 'api/requests';
import { push } from 'connected-react-router';

import { getCurrentUserRequest } from 'containers/App/actions';
import { SIGN_UP_REQUEST } from './constants';

export function* signUp(action) {
  const { data, handleErrors } = action.data;
  try {
    const response = yield call(signUpApi, data);

    localStorage.setItem('auth_token', response.data.token);

    yield put(getCurrentUserRequest());
    yield put(push('/'));
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export default function* signUpSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
