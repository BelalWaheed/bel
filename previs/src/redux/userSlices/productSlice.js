import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
  loading: false,
  viewProduct: {
    id: "",
    title: "",
    price: 0,
    description: "",
    category: "",
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
    setViewProduct: (state, { payload }) => {
      state.viewProduct = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
    addProduct: (state, { payload }) => {
      const productInCart = state.cart.find((item) => item.id === payload.id);

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        state.cart.push({ ...payload, quantity: 1 });
      }
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((item) => item.id !== payload.id);
    },

    increaseN: (state, { payload }) => {
      const productInCart = state.cart.find((item) => item.id === payload.id);

      if (productInCart) {
        productInCart.quantity += 1;
      }
    },

    decreaseN: (state, { payload }) => {
      const productInCart = state.cart.find((item) => item.id === payload.id);

      if (productInCart && productInCart.quantity > 1) {
        productInCart.quantity -= 1;
      }
    },

    setTitle: (state, { payload }) => {
      state.viewProduct.title = payload;
    },
    setPrice: (state, { payload }) => {
      state.viewProduct.price = payload;
    },
    setCategory: (state, { payload }) => {
      state.viewProduct.category = payload;
    },
    setDescription: (state, { payload }) => {
      state.viewProduct.description = payload;
    },
    setImage: (state, { payload }) => {
      state.viewProduct.image = payload;
    },
    setRate: (state, { payload }) => {
      state.viewProduct.rating.rate = payload;
    },
    setCount: (state, { payload }) => {
      state.viewProduct.rating.count = payload;
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
  setDescription,
  setImage,
  setRate,
  setCount,
  resetCart,
} = productsSlice.actions;
