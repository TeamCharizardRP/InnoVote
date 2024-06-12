import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ideasList: [],
};

const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {
    setIdeasList: (state, action) => {
      state.ideasList = action.payload;
    },
  },
});

export const { setIdeasList } = ideasSlice.actions;
export default ideasSlice.reducer;
