/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectRoute = state => state.get('route');
const selectGlobal = state => state.get('global');

const makeSelectLocation = () => createSelector(selectRoute, routeState => routeState.get('location').toJS());

const makeSelectCurrentUser = () => createSelector(selectGlobal, globalState => globalState.get('currentUser'));

const makeSelectMetaData = () => createSelector(selectGlobal, globalState => globalState.get('metaData'));

const makeSelectIsTokenValid = () => createSelector(selectGlobal, globalState => globalState.get('isTokenValid'));

const makeSelectIsTokenChecked = () => createSelector(selectGlobal, globalState => globalState.get('isTokenChecked'));

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLocation,
  makeSelectMetaData,
  makeSelectIsTokenValid,
  makeSelectIsTokenChecked,
};
