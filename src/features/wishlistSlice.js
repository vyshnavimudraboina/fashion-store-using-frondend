
import { createSlice } from "@reduxjs/toolkit";

// Load Wishlist data from LocalStorage
const loadWishlist = () => {
  try {
    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch {
    return [];
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: loadWishlist(),

  reducers: {
    addWishlist: (state, action) => {
      const exists = state.find(
        (product) => product.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
      }
    },

    removeWishlist: (state, action) => {
      return state.filter(
        (product) => product.id !== action.payload
      );
    }
  }
});

export const {
  addWishlist,
  removeWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
