import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyAnswers = state => state.get('search', initialState);

const makeSelectSuitableIssues = () =>
  createSelector(selectMyAnswers, myAnswersState => myAnswersState.get('suitableIssues'));

const makeSelectSuitableOffers = () =>
  createSelector(selectMyAnswers, myAnswersState => myAnswersState.get('suitableOffers'));

export { selectMyAnswers, makeSelectSuitableIssues, makeSelectSuitableOffers };
