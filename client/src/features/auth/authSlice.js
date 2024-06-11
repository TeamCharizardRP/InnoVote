import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  password: '',
  error: '',
  userId: localStorage.getItem('userId') || '',
  token: localStorage.getItem('token') || '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCreds: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setError: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    setToken: (state, action) => {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
    },
    clearToken: (state) => {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      state.userId = null;
      state.token = null;
    },
  },
});

export const { setCreds, setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
