import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  group: null,
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groupId = action.payload;
    },
  },
});

export const { addGroup } = groupSlice.actions;
export default groupSlice.reducer;
