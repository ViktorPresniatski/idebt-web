import { call, put, takeLatest } from 'redux-saga/effects';
import { signInApi } from 'api/requests';
import { push } from 'connected-react-router';

import { getCurrentUserRequest } from 'containers/App/actions';
import { SIGN_IN_REQUEST } from './constants';

export function* signIn(action) {
  const { data, handleErrors } = action.data;
  try {
    const response = yield call(signInApi, data);

    localStorage.setItem('auth_token', response.data.token);

    yield put(getCurrentUserRequest());
    yield put(push('/'));
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export default function* signInSaga() {
  yield takeLatest(SIGN_IN_REQUEST, signIn);
}
