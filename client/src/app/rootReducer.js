import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
