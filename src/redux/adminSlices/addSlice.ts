import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AdminAddState, Product } from "@/types";

const initialState: AdminAddState = {
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
  name: "adminAdd",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Omit<Product, "id">>) => {
      state.product = action.payload;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.product.title = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.product.price = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.product.category = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.product.description = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.product.image = action.payload;
    },
    setRate: (state, action: PayloadAction<number>) => {
      state.product.rating.rate = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.product.rating.count = action.payload;
    },
    resetProduct: (state) => {
      state.product = initialState.product;
    },
  },
});

export const {
  setProduct,
  setTitle,
  setPrice,
  setCategory,
  setDescription,
  setImage,
  setRate,
  setCount,
  resetProduct,
} = addSlice.actions;
export const adminAdd = addSlice.reducer;
