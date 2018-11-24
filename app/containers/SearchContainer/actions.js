import {
  GET_SUITABLE_ISSUES_REQUEST,
  GET_SUITABLE_OFFERS_REQUEST,
  GET_SUITABLE_ISSUES_SUCCESS,
  GET_SUITABLE_OFFERS_SUCCESS,
  CREATE_MATCH_REQUEST,
} from './constants';

export const getSuitableIssuesRequest = data => ({
  type: GET_SUITABLE_ISSUES_REQUEST,
  data,
});

export const getSuitableIssuesSuccess = data => ({
  type: GET_SUITABLE_ISSUES_SUCCESS,
  data,
});

export const getSuitableOffersRequest = data => ({
  type: GET_SUITABLE_OFFERS_REQUEST,
  data,
});

export const getSuitableOffersSuccess = data => ({
  type: GET_SUITABLE_OFFERS_SUCCESS,
  data,
});

export const createMatchRequest = data => ({
  type: CREATE_MATCH_REQUEST,
  data,
});
