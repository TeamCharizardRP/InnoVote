import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.js';
// import { authApi } from '../features/auth/authAPI';
// import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: rootReducer,
  // [authApi.reducerPath]: authApi.reducer,

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

// setupListeners(store.dispatch);

export default store;
