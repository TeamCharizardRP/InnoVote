import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  info: [],
  list: [],
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setGroupName: (state, action) => {
      state.name = action.payload;
    },
    setGroupInfo: (state, action) => {
      state.info = action.payload;
    },
    setGroupList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setGroupName, setGroupInfo, setGroupList } = groupSlice.actions;
export default groupSlice.reducer;
