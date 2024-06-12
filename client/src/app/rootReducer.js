import { combineReducers } from '@reduxjs/toolkit';
import groupReducer from '../features/group/groupSlice.js';
import authReducer from '../features/auth/authSlice.js';
import ideasReducer from '../features/ideas/ideasSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
  ideas: ideasReducer,
});

export default rootReducer;
