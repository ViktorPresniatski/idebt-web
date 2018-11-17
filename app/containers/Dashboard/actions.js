import {
  GET_ISSUES_REQUEST,
  GET_ISSUES_SUCCESS,
  GET_OFFERS_REQUEST,
  GET_OFFERS_SUCCESS,
  SUBMIT_NEW_ISSUE_REQUEST,
  SUBMIT_NEW_OFFER_REQUEST,
  CLOSE_ISSUE_REQUEST,
  CLOSE_OFFER_REQUEST,
} from './constants';

export const getIssuesRequest = () => ({
  type: GET_ISSUES_REQUEST,
});

export const getIssuesSuccess = data => ({
  type: GET_ISSUES_SUCCESS,
  data,
});

export const getOffersRequest = () => ({
  type: GET_OFFERS_REQUEST,
});

export const getOffersSuccess = data => ({
  type: GET_OFFERS_SUCCESS,
  data,
});

export const submitNewIssueRequest = data => ({
  type: SUBMIT_NEW_ISSUE_REQUEST,
  data,
});

export const submitNewOfferRequest = data => ({
  type: SUBMIT_NEW_OFFER_REQUEST,
  data,
});

export const closeIssueRequest = data => ({
  type: CLOSE_ISSUE_REQUEST,
  data,
});

export const closeOfferRequest = data => ({
  type: CLOSE_OFFER_REQUEST,
  data,
});
