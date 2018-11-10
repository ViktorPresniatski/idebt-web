import { fromJS } from 'immutable';

export const initialState = fromJS({});

function signUpReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default signUpReducer;
