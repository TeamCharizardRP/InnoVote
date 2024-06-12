import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

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
