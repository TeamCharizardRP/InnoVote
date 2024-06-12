import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  error: '',
  userId: null,
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
      state.username = '';
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = '';
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    clearToken: (state) => {
      localStorage.removeItem('token');
      state.userId = null;
      state.token = '';
    },
  },
});

export const { setUsername, setUserId, clearCreds, setError, clearError, setToken, clearToken } =
  authSlice.actions;
export default authSlice.reducer;
