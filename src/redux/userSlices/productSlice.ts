import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductsState, Product, ViewProduct } from "@/types";

const initialState: ProductsState = {
  products: [],
  cart: [],
  loading: false,
  viewProduct: {
    id: "",
    title: "",
    price: 0,
    description: "",
    category: "",
    gender: "",
    image: "",
    rating: {
      rate: 0,
      count: 0,
    },
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setViewProduct: (state, action: PayloadAction<ViewProduct>) => {
      state.viewProduct = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      const productInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: string }>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    increaseN: (state, action: PayloadAction<{ id: string }>) => {
      const productInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (productInCart) {
        productInCart.quantity += 1;
      }
    },
    decreaseN: (state, action: PayloadAction<{ id: string }>) => {
      const productInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (productInCart && productInCart.quantity > 1) {
        productInCart.quantity -= 1;
      }
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.viewProduct.title = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.viewProduct.price = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.viewProduct.category = action.payload;
    },
    setGender: (state, action: PayloadAction<string>) => {
      state.viewProduct.gender = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.viewProduct.description = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.viewProduct.image = action.payload;
    },
    setRate: (state, action: PayloadAction<number>) => {
      state.viewProduct.rating.rate = action.payload;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.viewProduct.rating.count = action.payload;
    },
    resetCart: (state) => {
      state.cart = [];
    },
  },
});

export const products = productsSlice.reducer;
export const {
  addProduct,
  setProducts,
  increaseN,
  decreaseN,
  removeFromCart,
  setLoading,
  setViewProduct,
  setTitle,
  setPrice,
  setCategory,
  setGender,
  setDescription,
  setImage,
  setRate,
  setCount,
  resetCart,
} = productsSlice.actions;
