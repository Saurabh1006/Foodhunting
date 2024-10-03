import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push({ ...action.payload, quantity: 1 }); // Add default quantity
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.itemId !== action.payload.itemId);
    },
    increaseQuantity: (state, action) => {
      const item = state.find(item => item.itemId === action.payload.itemId);
      if (item) {
        item.quantity += 1; // Increase item quantity
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.find(item => item.itemId === action.payload.itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1; // Decrease item quantity
      }
    },
    clearCart: (state) => {
      return [];
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
