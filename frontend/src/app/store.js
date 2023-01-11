import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import productSlice from "../features/shop/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productSlice,
  },
});
