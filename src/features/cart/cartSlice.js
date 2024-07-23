import { createSlice } from '@reduxjs/toolkit';

/**
 * Initial state for the cart slice.
 *
 * @typedef {Object} CartState
 * @property {Array} cart - The array of items in the cart.
 */

/** @type {CartState} */
const initialState = {
  cart: [],
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: 'Mediterranean',
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};

/**
 * Represents a slice of the cart state in the Redux store.
 *
 * @typedef {Object} CartSlice
 * @property {string} name - The name of the slice.
 * @property {Object} initialState - The initial state of the slice.
 * @property {Object} reducers - The reducers for the slice.
 * @property {Function} reducers.addItem - Reducer function for adding an item to the cart.
 * @property {Function} reducers.deleteItem - Reducer function for deleting an item from the cart.
 * @property {Function} reducers.increaseItemQuantity - Reducer function for increasing the quantity of an item in the cart.
 * @property {Function} reducers.decreaseItemQuantity - Reducer function for decreasing the quantity of an item in the cart.
 * @property {Function} reducers.clearCart - Reducer function for clearing the cart.
 */
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

/**
 * This file exports the reducer function for the cart slice.
 * @module cartSlice
 * @file FILEPATH: /c:/Udemy/ultimate-react-course-main/16-fast-react-pizza/fast-react-pizza-tailwind/src/features/cart/cartSlice.js
 */
export default cartSlice.reducer;

/**
 * Retrieves the cart from the state.
 *
 * @param {Object} state - The Redux state object.
 * @returns {Array} The cart array.
 */
export const getCart = (state) => state.cart.cart;

/**
 * Calculates the total quantity of items in the cart.
 *
 * @param {Object} state - The current state of the cart.
 * @returns {number} The total quantity of items in the cart.
 */
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

/**
 * Calculates the total price of the items in the cart.
 *
 * @param {Object} state - The current state of the cart.
 * @returns {number} The total price of the items in the cart.
 */
export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

/**
 * Retrieves the current quantity of a pizza by its ID from the cart state.
 *
 * @param {string} id - The ID of the pizza.
 * @returns {number} The current quantity of the pizza in the cart. Returns 0 if the pizza is not found.
 */
export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
