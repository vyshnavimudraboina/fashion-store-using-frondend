
import { configureStore } from "@reduxjs/toolkit";

import wishlistReducer from "../features/wishlistSlice";
import cartReducer from "../features/cartSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    cart: cartReducer
  }
});

// Save Wishlist & Cart data to LocalStorage
store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "wishlist",
    JSON.stringify(state.wishlist)
  );

  localStorage.setItem(
    "cart",
    JSON.stringify(state.cart)
  );
});

