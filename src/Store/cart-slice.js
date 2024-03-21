import { createSlice } from "@reduxjs/toolkit";
const cartinitialState = {
  items: [],
  totalQuantity: 0,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: cartinitialState,
  change: false,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const isItemExist = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.change = true;
      if (!isItemExist) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        isItemExist.quantity++;
        isItemExist.totalPrice = isItemExist.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const isItemExist = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.change = true;
      if (isItemExist.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        isItemExist.quantity--;
        isItemExist.totalPrice = isItemExist.totalPrice - isItemExist.price;
      }
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
