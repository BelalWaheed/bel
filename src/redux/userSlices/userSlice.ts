import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserState, User } from "@/types";

const initialState: UserState = {
  user: {
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
  },
  allUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.user.gender = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const user = userSlice.reducer;
export const {
  setEmail,
  setName,
  setPassword,
  setAllUsers,
  setGender,
  resetUser,
} = userSlice.actions;
