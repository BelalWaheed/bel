import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
  },
  allUsers: [{}],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAllUsers: (state, { payload }) => {
      state.allUsers = payload;
    },
    
    setName: (state, { payload }) => {
      state.user.name = payload;
    },
    setGender: (state, { payload }) => {
      state.user.gender = payload;
    },
    setEmail: (state, { payload }) => {
      state.user.email = payload;
    },
    setPassword: (state, { payload }) => {
      state.user.password = payload;
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
