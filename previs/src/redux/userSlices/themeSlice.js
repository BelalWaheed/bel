import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.theme === "dark" ? false : true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    darkMode: (state) => {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      state.theme = false;
    },
    lightMode: (state) => {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      state.theme = true;
    },
  },
});

export const theme = themeSlice.reducer;
export const { darkMode, lightMode } = themeSlice.actions;
