import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedUser: {},
  logged: false,
  editLoggedUser: {
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
  },
};

const userSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setLoggedUser: (state, { payload }) => {
      state.loggedUser = payload;
    },
    setEditLoggedUser: (state, { payload }) => {
      state.editLoggedUser = { ...payload }; 
    },
    setLogged: (state, { payload }) => {
      state.logged = payload;
    },
    setName: (state, { payload }) => {
      state.editLoggedUser.name = payload;
    },
    setEmail: (state, { payload }) => {
      state.editLoggedUser.email = payload;
    },
    setPassword: (state, { payload }) => {
      state.editLoggedUser.password = payload;
    },
  },
});

export const profile = userSlice.reducer;

export const {
  setLogged,
  setLoggedUser,
  setEditLoggedUser,
  setName,
  setEmail,
  setPassword,
} = userSlice.actions;
