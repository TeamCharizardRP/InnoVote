import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  error: null,
  userId: '',
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    clearCreds: (state) => {
      state.username = null;
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

export const { setUsername, clearCreds, setError, clearError, setToken, clearToken } =
  authSlice.actions;
export default authSlice.reducer;
