import {AnyAction, CombinedState, combineReducers} from '@reduxjs/toolkit';

import authReducer, {AUTH_LOGOUT} from './auth/authSlice';
import {AuthSliceState} from './auth/types';

const combinedReducer = combineReducers({
  auth: authReducer,
});

export const rootReducer = (
  state:
    | CombinedState<{
        auth: AuthSliceState;
      }>
    | undefined,
  action: AnyAction,
) => {
  if (action.type === `${AUTH_LOGOUT}/fulfilled`) {
    state = undefined;
  }
  return combinedReducer(state, action);
};
