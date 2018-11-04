import { fromJS } from 'immutable';

import { CHECK_TOKEN_SUCCESS, CHECK_TOKEN_ERROR } from 'containers/App/constants';

export const initialState = fromJS({
  isTokenChecked: false,
  isTokenValid: false,
});

function signInReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_TOKEN_ERROR:
      return state.set('isTokenValid', false).set('isTokenChecked', true);
    case CHECK_TOKEN_SUCCESS:
      return state.set('isTokenValid', true).set('isTokenChecked', true);
    default:
      return state;
  }
}

export default signInReducer;
