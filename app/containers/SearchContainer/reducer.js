import { fromJS } from 'immutable';
import { GET_SUITABLE_ISSUES_SUCCESS, GET_SUITABLE_OFFERS_SUCCESS } from './constants';

export const initialState = fromJS({
  suitableIssues: undefined,
  suitableOffers: undefined,
});

function myAnswersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUITABLE_ISSUES_SUCCESS:
      return state.set('suitableIssues', action.data);
    case GET_SUITABLE_OFFERS_SUCCESS:
      return state.set('suitableOffers', action.data);
    default:
      return state;
  }
}

export default myAnswersReducer;
