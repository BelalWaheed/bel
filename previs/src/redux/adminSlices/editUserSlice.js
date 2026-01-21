import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "",
    email: "",
    password: "",
    gender: "",
    role: "user",
  },
};

const editUserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEditUser: (state, { payload }) => {
      state.user = payload;
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

export const editUser = editUserSlice.reducer;
export const { setEmail, setName, setPassword, setGender, resetUser ,setEditUser} =
  editUserSlice.actions;
