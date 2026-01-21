import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FlagsState } from "@/types";

const initialState: FlagsState = {
  productChanged: false,
  userChanged: false,
};

const flagsSlice = createSlice({
  name: "flags",
  initialState,
  reducers: {
    setProductChanged: (state, action: PayloadAction<boolean>) => {
      state.productChanged = action.payload;
    },
    setUserChanged: (state, action: PayloadAction<boolean>) => {
      state.userChanged = action.payload;
    },
    toggleProductChanged: (state) => {
      state.productChanged = !state.productChanged;
    },
    toggleUserChanged: (state) => {
      state.userChanged = !state.userChanged;
    },
  },
});

export const flags = flagsSlice.reducer;
export const {
  setProductChanged,
  setUserChanged,
  toggleProductChanged,
  toggleUserChanged,
} = flagsSlice.actions;
