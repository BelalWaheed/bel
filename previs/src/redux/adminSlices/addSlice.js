import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: {
    title: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  },
};

const addSlice = createSlice({
  name: "add",
  initialState,
  reducers: {
    addProduct: (state, { payload }) => {
      state.product = payload;
    },
    setTitle: (state, { payload }) => {
      state.product.title = payload;
    },
    setPrice: (state, { payload }) => {
      state.product.price = payload;
    },
    setCategory: (state, { payload }) => {
      state.product.category = payload;
    },
    setDescription: (state, { payload }) => {
      state.product.description = payload;
    },
    setImage: (state, { payload }) => {
      state.product.image = payload;
    },
    setRate: (state, { payload }) => {
      state.product.rating.rate = payload;
    },
    setCount: (state, { payload }) => {
      state.product.rating.count = payload;
    },
  },
});

export const {
  addProduct,
  setTitle,
  setPrice,
  setCategory,
  setDescription,
  setImage,
  setRate,
  setCount,
} = addSlice.actions;
export const adminAdd = addSlice.reducer;
