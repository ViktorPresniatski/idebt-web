import {
  GET_ISSUES_DEBTS_REQUEST,
  GET_ISSUES_DEBTS_SUCCESS,
  GET_OFFERS_DEBTS_REQUEST,
  GET_OFFERS_DEBTS_SUCCESS,
  REPAY_DEBT_REQUEST,
} from './constants';

export const getIssuesDebtsRequest = () => ({
  type: GET_ISSUES_DEBTS_REQUEST,
});

export const getIssuesDebtsSuccess = data => ({
  type: GET_ISSUES_DEBTS_SUCCESS,
  data,
});

export const getOffersDebtsRequest = () => ({
  type: GET_OFFERS_DEBTS_REQUEST,
});

export const getOffersDebtsSuccess = data => ({
  type: GET_OFFERS_DEBTS_SUCCESS,
  data,
});

export const repayDebtRequest = data => ({
  type: REPAY_DEBT_REQUEST,
  data,
});
