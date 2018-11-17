import { fromJS } from 'immutable';
import { GET_ISSUES_SUCCESS, GET_OFFERS_SUCCESS } from './constants';

export const initialState = fromJS({
  issues: undefined,
  offers: undefined,
});

function myAnswersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ISSUES_SUCCESS:
      return state.set('issues', action.data);
    case GET_OFFERS_SUCCESS:
      return state.set('offers', action.data);
    default:
      return state;
  }
}

export default myAnswersReducer;
