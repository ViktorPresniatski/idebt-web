import { call, put, takeLatest } from 'redux-saga/effects';
import {
  updateCurrentUserApi,
  updateCurrentUserPasswordApi,
  replenishBalanceApi,
  withdrawBalanceApi,
} from 'api/requests';

import { getCurrentUserRequest } from 'containers/App/actions';
import { CURRENT_USER_UPDATE_REQUEST, CURRENT_USER_UPDATE_PASSWORD_REQUEST, MANAGE_BALANCE_REQUEST } from './constants';

const BALANCE_API_MAPPING = {
  replenish: replenishBalanceApi,
  withdraw: withdrawBalanceApi,
};

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

export function* manageBalance(action) {
  const { data, handleSuccess, handleErrors } = action.data;
  const { operationType } = data;
  delete data.operationType;

  try {
    const response = yield call(BALANCE_API_MAPPING[operationType], data);
    yield put(getCurrentUserRequest());
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
  yield takeLatest(MANAGE_BALANCE_REQUEST, manageBalance);
}
