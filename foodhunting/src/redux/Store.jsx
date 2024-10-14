// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

// Utility functions to load and save state to localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined; // No saved state
    }
    const parsedState = JSON.parse(serializedState);
    return parsedState;
  } catch (err) {
    console.error('Could not load state from localStorage:', err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem('cart', serializedState);
  } catch (err) {
    console.error('Could not save state to localStorage:', err);
  }
};

// Preload state from localStorage if available
const preloadedState = {
  cart: loadState() || [],
};

// Configure the Redux store
const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Add other reducers here if needed
  },
  preloadedState,
});

// Subscribe to store updates to save the cart to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
