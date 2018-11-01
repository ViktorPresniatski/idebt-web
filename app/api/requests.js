import { get, post, patch, del, postFormData, patchFormData } from './utils';
import * as PATHS from './paths';

// [Auth]
export const signInApi = data => post(PATHS.SIGN_IN_PATH, false, data);
export const signUpApi = data => post(PATHS.SIGN_UP_PATH, false, data);

// [Current User]
export const getCurrentUserApi = () => get(PATHS.USER_INFO, true);
export const updateCurrentUserApi = data => patch(`${PATHS.CURRENT_USER_PATH}${data.id}/`, true, data);
export const updateCurrentUserPasswordApi = data =>
  post(`${PATHS.CURRENT_USER_PATH}${data.id}/${PATHS.SET_PASSWORD}`, true, data)

export const getIssuesApi = () => get(PATHS.ISSUES_PATH, true);
export const getOffersApi = () => get(PATHS.OFFERS_PATH, true);
export const submitNewIssueApi = data => post(PATHS.ISSUES_PATH, true, data);
export const submitNewOfferApi = data => post(PATHS.OFFERS_PATH, true, data);
export const closeIssueApi = data => post(`${PATHS.ISSUES_PATH}${data.id}/${PATHS.CLOSE_PATH}`, true)
export const closeOfferApi = data => post(`${PATHS.OFFERS_PATH}${data.id}/${PATHS.CLOSE_PATH}`, true)

export const getSuitableIssuesApi = data => get(`${PATHS.ISSUES_PATH}${data.id}/${PATHS.SUITABLE}`, true);
export const getSuitableOffersApi = data => get(`${PATHS.OFFERS_PATH}${data.id}/${PATHS.SUITABLE}`, true);

export const createMatchApi = data => post(PATHS.MATCH_PATH, true, data);

export const getIssuesDebtsApi = () => get(PATHS.DEBTS_I_OWE_PATH, true);
export const getOffersDebtsApi = () => get(PATHS.DEBTS_OWE_ME_PATH, true);
export const repayDebtApi = data => post(`${PATHS.DEBTS_PATH}${data.id}/${PATHS.REPAY_DEBT_PATH}`, true, data);

