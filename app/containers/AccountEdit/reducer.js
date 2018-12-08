import { fromJS } from 'immutable';

import { CURRENT_USER_UPDATE_SUCCESS, CURRENT_USER_UPDATE_ERROR } from './constants';

export const initialState = fromJS({
  metaData: null,
});

function accountSetupReducer(state = initialState, action) {
  switch (action.type) {
    // case CURRENT_USER_UPDATE_SUCCESS:
    //   return state.set('metaData', action.data);
    // case CURRENT_USER_UPDATE_ERROR:
    //   return state.set('emailSentModalVisible', true);
    default:
      return state;
  }
}

export default accountSetupReducer;
