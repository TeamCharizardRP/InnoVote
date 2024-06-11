import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  password: null,
  error: null,
  userId: null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCreds: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    clearCreds: (state) => {
      state.username = null;
      state.password = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setToken: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    clearToken: (state) => {
      localStorage.removeItem('token');
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setCreds, clearCreds, setError, clearError, setToken, clearToken } =
  authSlice.actions;
export default authSlice.reducer;
