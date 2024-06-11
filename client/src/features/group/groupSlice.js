import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [],
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
  },
});

export const { addGroup } = groupSlice.actions;
export default groupSlice.reducer;
