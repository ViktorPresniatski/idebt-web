import { call, put, takeLatest } from 'redux-saga/effects';

import { getIssuesDebtsApi, getOffersDebtsApi, repayDebtApi } from 'api/requests';

import { getCurrentUserRequest } from 'containers/App/actions';

import { GET_ISSUES_DEBTS_REQUEST, GET_OFFERS_DEBTS_REQUEST, REPAY_DEBT_REQUEST } from './constants';
import { getIssuesDebtsRequest, getIssuesDebtsSuccess, getOffersDebtsSuccess } from './actions';

export function* getIssuesDebts() {
  const response = yield call(getIssuesDebtsApi);
  yield put(getIssuesDebtsSuccess(response.data));
}

export function* getOffersDebts() {
  const response = yield call(getOffersDebtsApi);
  yield put(getOffersDebtsSuccess(response.data));
}

export function* repayDebt(action) {
  const { data, handleSuccess, handleErrors } = action.data;
  try {
    yield call(repayDebtApi, data);
    yield call(handleSuccess);
    yield put(getIssuesDebtsRequest());
    yield put(getCurrentUserRequest());
  } catch (errors) {
    if (errors.status === 400 || errors.status === 422) {
      yield call(handleErrors, errors.data);
    }
  }
}

export default function* debtsSaga() {
  yield takeLatest(GET_ISSUES_DEBTS_REQUEST, getIssuesDebts);
  yield takeLatest(GET_OFFERS_DEBTS_REQUEST, getOffersDebts);
  yield takeLatest(REPAY_DEBT_REQUEST, repayDebt);
}
