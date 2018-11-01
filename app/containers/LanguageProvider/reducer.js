/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_LOCALE } from 'globalConstants';
import { CHANGE_LOCALE } from './constants';

export const initialState = fromJS({
  locale: localStorage.getItem('locale') || DEFAULT_LOCALE,
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      localStorage.setItem('locale', action.locale ? action.locale.toLowerCase() : DEFAULT_LOCALE);
      return state.set('locale', action.locale ? action.locale.toLowerCase() : DEFAULT_LOCALE);
    default:
      return state;
  }
}

export default languageProviderReducer;
