import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSignIn = state => state.get('sign_in', initialState);

const makeSelectIsTokenValid = () => createSelector(selectSignIn, signInState => signInState.get('isTokenValid'));
const makeSelectIsTokenChecked = () => createSelector(selectSignIn, signInState => signInState.get('isTokenChecked'));

export { selectSignIn, makeSelectIsTokenValid, makeSelectIsTokenChecked };
