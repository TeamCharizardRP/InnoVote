import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  tokens: {
    access_token: null,
    id_token: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload.tokens;
    },
    clearTokens: (state) => {
      state.tokens.access_token = null;
      state.tokens.id_token = null;
    },
  },
});

export const { setTokens, clearTokens } = authSlice.actions;
export default authSlice.reducer;
