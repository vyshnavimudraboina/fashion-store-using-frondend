
import { configureStore } from "@reduxjs/toolkit";

import wishlistReducer from "../features/wishlistSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer
  }
});

// Save Wishlist data to LocalStorage
store.subscribe(() => {
  const wishlist = store.getState().wishlist;

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );
});
