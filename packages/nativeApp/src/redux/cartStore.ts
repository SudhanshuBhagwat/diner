import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';
import { Item } from '../models/items';

export interface CartItem extends Item {
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
  name: 'cartStore',
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
    addItemsToCart: (state, action: PayloadAction<CartItem>) => {
      var itemFound = false;
      if (state.itemsInCart.length > 0) {
        state.itemsInCart.forEach((currItem, key) => {
          if (currItem.id === action.payload.id) {
            state.itemsInCart[key].quantity += action.payload.quantity;
            itemFound = true;
          }
        });
        if (!itemFound) {
          state.itemsInCart.push(action.payload);
        }
      } else {
        state.itemsInCart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<CartItem>) => {
      state.itemsInCart.map((currItem, key) => {
        if (currItem.id === action.payload.id) {
          state.itemsInCart[key].quantity--;
          if (state.itemsInCart[key].quantity === 0) {
            state.itemsInCart = state.itemsInCart.filter(
              item => item.id !== action.payload.id,
            );
          }
        }
      });
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.itemsInCart = state.itemsInCart.filter(
        item => item.id !== action.payload.id,
      );
    },
    emptyCart: state => {
      state.itemsInCart = [];
    },
  },
});

export const {
  addToCart,
  addItemsToCart,
  removeFromCart,
  removeItem,
  emptyCart,
} = cartStore.actions;

export const itemCount = (state: RootState) => {
  var items = 0;
  state.modalStore.itemsInCart.forEach(item => {
    items += item.quantity;
  });
  return items;
};

export const totalPrice = (state: RootState) => {
  var price = 0;
  state.modalStore.itemsInCart.forEach(item => {
    price += item.quantity * item.price;
  });
  return price;
};

export const givenItemCoumt = (state: RootState, item: CartItem) => {
  return state.modalStore.itemsInCart.find(currItem => currItem.id === item.id);
};

export const items = (state: RootState) => state.modalStore.itemsInCart;

export default cartStore;
