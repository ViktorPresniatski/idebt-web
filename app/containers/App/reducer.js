/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  SET_CURRENT_USER_SUCCESS,
  GET_META_DATA_SUCCESS,
  CHECK_TOKEN_REQUEST,
  CHECK_TOKEN_SUCCESS,
  CHECK_TOKEN_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  currentUser: null,
  metaData: null,
  isTokenValid: null,
  isTokenChecked: null,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER_SUCCESS:
      return state.set('currentUser', action.data);
    case GET_META_DATA_SUCCESS:
      return state.set('metaData', action.data);
    case CHECK_TOKEN_REQUEST:
      return state.set('isTokenValid', false).set('isTokenChecked', false);
    case CHECK_TOKEN_SUCCESS:
      return state.set('isTokenValid', true).set('isTokenChecked', true);
    case CHECK_TOKEN_ERROR:
      return state.set('isTokenValid', false).set('isTokenChecked', true);
    default:
      return state;
  }
}

export default appReducer;
