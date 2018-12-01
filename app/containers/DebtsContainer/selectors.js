import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyAnswers = state => state.get('debts', initialState);

const makeSelectIssuesDebts = () =>
  createSelector(selectMyAnswers, myAnswersState => myAnswersState.get('issuesDebts'));

const makeSelectOffersDebts = () =>
  createSelector(selectMyAnswers, myAnswersState => myAnswersState.get('offersDebts'));

export { selectMyAnswers, makeSelectIssuesDebts, makeSelectOffersDebts };
