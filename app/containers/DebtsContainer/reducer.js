import { fromJS } from 'immutable';
import { GET_ISSUES_DEBTS_SUCCESS, GET_OFFERS_DEBTS_SUCCESS } from './constants';

export const initialState = fromJS({
  issuesDebts: undefined,
  offersDebts: undefined,
});

function debtsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ISSUES_DEBTS_SUCCESS:
      return state.set('issuesDebts', action.data);
    case GET_OFFERS_DEBTS_SUCCESS:
      return state.set('offersDebts', action.data);
    default:
      return state;
  }
}

export default debtsReducer;
