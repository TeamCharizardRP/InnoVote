import { combineReducers } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/login/loginSlice.js';
import groupReducer from '../features/group/groupSlice.js';
import authReducer from '../features/auth/authSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
  group: groupReducer,
});

export default rootReducer;
