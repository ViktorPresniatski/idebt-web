import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyAnswers = state => state.get('dashboard', initialState);

const makeSelectIssues = () => createSelector(selectMyAnswers, myAnswersState => myAnswersState.get('issues'));

const makeSelectOffers = () => createSelector(selectMyAnswers, myAnswersState => myAnswersState.get('offers'));

export { selectMyAnswers, makeSelectIssues, makeSelectOffers };
