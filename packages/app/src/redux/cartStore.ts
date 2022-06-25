import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { Item } from "../models/items";

interface CartItem extends Item {
  quantity: number;
}

interface INITIAL_STATE {
  itemsInCart: CartItem[];
}

const initialState: INITIAL_STATE = {
  itemsInCart: [],
};

const cartStore = createSlice({
  initialState,
  name: "cartStore",
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      var itemFound = false;
      if (state.itemsInCart.length > 0) {
        state.itemsInCart.forEach((currItem, key) => {
          if (currItem.id === action.payload.id) {
            state.itemsInCart[key].quantity++;
            itemFound = true;
          }
        });
        if (!itemFound) {
          const newItem: CartItem = {
            ...action.payload,
            quantity: 1,
          };
          state.itemsInCart.push(newItem);
        }
      } else {
        const newItem: CartItem = {
          ...action.payload,
          quantity: 1,
        };
        state.itemsInCart.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      if (state.itemsInCart.length > 1) {
        state.itemsInCart.map((currItem, key) => {
          if (currItem.id === action.payload.id) {
            state.itemsInCart[key].quantity--;
          }
        });
      }
    },
    emptyCart: (state, action) => {
      state.itemsInCart = [];
    },
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartStore.actions;

export const itemCount = (state: RootState) => {
  var items = 0;
  state.modalStore.itemsInCart.forEach((item) => {
    items += item.quantity;
  });
  return items;
};

export const totalPrice = (state: RootState) => {
  var price = 0;
  state.modalStore.itemsInCart.forEach((item) => {
    price += item.quantity * item.price;
  });
  return price;
};

export default cartStore;
