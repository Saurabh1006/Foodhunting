// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Utility function to merge duplicate cart items
const mergeCartItems = (cartItems) => {
  const mergedCart = {};

  cartItems.forEach((item) => {
    const itemId = item.itemId;
    // Ensure quantity is at least 1
    const quantity = item.quantity && item.quantity > 0 ? item.quantity : 1;

    if (mergedCart[itemId]) {
      mergedCart[itemId].quantity += quantity;
    } else {
      mergedCart[itemId] = { ...item, quantity };
    }
  });

  // Convert the mergedCart object back to an array
  return Object.values(mergedCart);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: [], // Initial state as an array of cart items
  reducers: {
    // Sets the entire cart (used for initializing from localStorage)
    setCartItems: (state, action) => {
      return mergeCartItems(action.payload);
    },
    addToCart: (state, action) => {
      // Check if the item already exists in the cart
      const existingItem = state.find(item => item.itemId === action.payload.itemId);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
      }
    },
    removeFromCart: (state, action) => {
      return state.filter(item => item.itemId !== action.payload.itemId);
    },
    increaseQuantity: (state, action) => {
      const item = state.find(item => item.itemId === action.payload.itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.find(item => item.itemId === action.payload.itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: () => {
      return [];
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, setCartItems } = cartSlice.actions;

// Export reducer as default
export default cartSlice.reducer;

// Selectors
export const selectTotalItems = (state) => {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
};

// Select all cart items
export const selectCartItems = (state) => state.cart;
