import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  productChanged: false,
  userChanged: false,
};

const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    setProductChanged: (state, { payload }) => {
      state.productChanged = payload;
    },
    setUserChanged: (state, { payload }) => {
      state.userChanged = payload;
    },
  },
});

export const flags = flagsSlice.reducer;
export const { setProductChanged, setUserChanged } = flagsSlice.actions;
