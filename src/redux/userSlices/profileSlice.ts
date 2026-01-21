import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProfileState, User, EditUser } from "@/types";

const initialState: ProfileState = {
  loggedUser: null,
  logged: false,
  editLoggedUser: {
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<User | null>) => {
      state.loggedUser = action.payload;
    },
    setEditLoggedUser: (state, action: PayloadAction<EditUser>) => {
      state.editLoggedUser = { ...action.payload };
    },
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.editLoggedUser.name = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.editLoggedUser.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.editLoggedUser.password = action.payload;
    },
  },
});

export const profile = profileSlice.reducer;

export const {
  setLogged,
  setLoggedUser,
  setEditLoggedUser,
  setName,
  setEmail,
  setPassword,
} = profileSlice.actions;
