import { call, put, takeLatest } from 'redux-saga/effects';

import { getIssuesApi, getOffersApi, submitNewIssueApi, submitNewOfferApi, closeIssueApi, closeOfferApi } from 'api/requests';

import {
  GET_ISSUES_REQUEST,
  GET_OFFERS_REQUEST,
  SUBMIT_NEW_ISSUE_REQUEST,
  SUBMIT_NEW_OFFER_REQUEST,
  CLOSE_ISSUE_REQUEST,
  CLOSE_OFFER_REQUEST,
} from './constants';

import { getIssuesRequest, getOffersRequest, getIssuesSuccess, getOffersSuccess } from './actions';

export function* getIssues() {
  const response = yield call(getIssuesApi);
  yield put(getIssuesSuccess(response.data));
}

export function* getOffers() {
  const response = yield call(getOffersApi);
  yield put(getOffersSuccess(response.data));
}

export function* submitNewIssue(action) {
  const { data, handleSuccess, handleErrors } = action.data;
  try {
    yield call(submitNewIssueApi, data);
    yield call(handleSuccess);
    yield put(getIssuesRequest());
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* submitNewOffer(action) {
  const { data, handleSuccess, handleErrors } = action.data;
  try {
    yield call(submitNewOfferApi, data);
    yield call(handleSuccess);
    yield put(getOffersRequest());
  } catch (errors) {
    if (errors.status === 400) {
      yield call(handleErrors, errors.data);
    }
  }
}

export function* closeIssue(action) {
  yield call(closeIssueApi, action.data);
  yield put(getIssuesRequest());
}

export function* closeOffer(action) {
  yield call(closeOfferApi, action.data);
  yield put(getOffersRequest());
}

export default function* myAnswersSaga() {
  yield takeLatest(GET_ISSUES_REQUEST, getIssues);
  yield takeLatest(GET_OFFERS_REQUEST, getOffers);
  yield takeLatest(SUBMIT_NEW_ISSUE_REQUEST, submitNewIssue);
  yield takeLatest(SUBMIT_NEW_OFFER_REQUEST, submitNewOffer);
  yield takeLatest(CLOSE_ISSUE_REQUEST, closeIssue);
  yield takeLatest(CLOSE_OFFER_REQUEST, closeOffer);
}
