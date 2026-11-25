import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCart(),
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity = 1 } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + quantity;
      } else {
        state.push({
          ...action.payload,
          quantity: quantity > 0 ? quantity : 1
        });
      }
    },

    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        if (quantity <= 0) {
          return state.filter((item) => item.id !== id);
        }
        existingItem.quantity = quantity;
      }
    },

    clearCart: () => {
      return [];
    }
  }
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
