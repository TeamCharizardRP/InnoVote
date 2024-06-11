import { combineReducers } from '@reduxjs/toolkit';
import groupReducer from '../features/group/groupSlice.js';
import authReducer from '../features/auth/authSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
});

export default rootReducer;
