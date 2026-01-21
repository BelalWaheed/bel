import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

// User Slices
import { products } from "./userSlices/productSlice";
import { profile } from "./userSlices/profileSlice";
import { theme } from "./userSlices/themeSlice";
import { user } from "./userSlices/userSlice";

// Admin Slices
import { adminAdd } from "./adminSlices/addSlice";
import { editUser } from "./adminSlices/editUserSlice";
import { flags } from "./adminSlices/flagsSlice";

const store = configureStore({
  reducer: {
    products,
    profile,
    theme,
    user,
    adminAdd,
    editUser,
    flags,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
