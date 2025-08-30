import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    cartItems: [],
    viewDetailData: {},
  },
  reducers: {
    increment: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item) {
        item.quantity += 1;
      }
      state.value = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    decrement: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      state.value = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    addToCart: (state, action) => {
      const newItem = action.payload;
      console.log("NEW-ITEM", newItem);
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...newItem, quantity: 1 });
      }

      state.value = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === itemId);

      if (itemIndex !== -1) {
        const removedQuantity = state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1);
        state.value -= removedQuantity;
      }
    },
    viewEventDetails: (state, action) => {
      console.log("VIEW DETAIL DATA", action.payload);
      state.viewDetailData = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.value = 0;
    },
    reset: (state) => {
      state.value = 0;
      state.cartItems = [];
    },
  },
});

export const {
  increment,
  decrement,
  addToCart,
  removeFromCart,
  viewEventDetails,
  clearCart,
  reset,
} = counterSlice.actions;
export default counterSlice.reducer;
