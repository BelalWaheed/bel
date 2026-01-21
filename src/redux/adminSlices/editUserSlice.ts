import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { EditUserState, EditUser } from "@/types";

const initialState: EditUserState = {
  user: {
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
  },
};

const editUserSlice = createSlice({
  name: "editUser",
  initialState,
  reducers: {
    setEditUser: (state, action: PayloadAction<EditUser>) => {
      state.user = action.payload;
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
    setRole: (state, action: PayloadAction<"user" | "admin">) => {
      state.user.role = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const editUser = editUserSlice.reducer;
export const {
  setEmail,
  setName,
  setPassword,
  setGender,
  setRole,
  resetUser,
  setEditUser,
} = editUserSlice.actions;
