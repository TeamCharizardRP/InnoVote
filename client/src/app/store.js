import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.js';
// import { authApi } from '../features/auth/authAPI';

export const store = configureStore({
  reducer: rootReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
