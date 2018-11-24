import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getSuitableIssuesApi,
  getSuitableOffersApi,
  createMatchApi,
  // submitNewIssueApi,
  // submitNewOfferApi,
} from 'api/requests';

import {
  GET_SUITABLE_ISSUES_REQUEST,
  GET_SUITABLE_OFFERS_REQUEST,
  CREATE_MATCH_REQUEST,
  // SUBMIT_NEW_ISSUE_REQUEST,
  // SUBMIT_NEW_OFFER_REQUEST,
} from './constants';

import { getSuitableIssuesSuccess, getSuitableOffersSuccess } from './actions';

export function* getSuitableIssues(action) {
  const response = yield call(getSuitableIssuesApi, action.data);
  yield put(getSuitableIssuesSuccess(response.data));
}

export function* getSuitableOffers(action) {
  const response = yield call(getSuitableOffersApi, action.data);
  yield put(getSuitableOffersSuccess(response.data));
}

export function* createMatch(action) {
  yield call(createMatchApi, action.data);
}

// export function* submitNewIssue(action) {
//   const { data, handleSuccess, handleErrors } = action.data;
//   try {
//     yield call(submitNewIssueApi, data);
//     yield call(handleSuccess);
//     yield put(getIssuesRequest());
//   } catch (errors) {
//     if (errors.status === 400) {
//       yield call(handleErrors, errors.data);
//     }
//   }
// }

// export function* submitNewOffer(action) {
//   const { data, handleSuccess, handleErrors } = action.data;
//   try {
//     yield call(submitNewOfferApi, data);
//     yield call(handleSuccess);
//     yield put(getOffersRequest());
//   } catch (errors) {
//     if (errors.status === 400) {
//       yield call(handleErrors, errors.data);
//     }
//   }
// }

export default function* searchSaga() {
  yield takeLatest(GET_SUITABLE_ISSUES_REQUEST, getSuitableIssues);
  yield takeLatest(GET_SUITABLE_OFFERS_REQUEST, getSuitableOffers);
  yield takeLatest(CREATE_MATCH_REQUEST, createMatch);
  // yield takeLatest(SUBMIT_NEW_ISSUE_REQUEST, submitNewIssue);
  // yield takeLatest(SUBMIT_NEW_OFFER_REQUEST, submitNewOffer);
}
