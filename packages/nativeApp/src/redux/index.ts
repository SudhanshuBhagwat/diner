import { configureStore } from '@reduxjs/toolkit';
import cartStore from './cartStore';
import themeStore from './themeStore';

const store = configureStore({
  reducer: {
    modalStore: cartStore.reducer,
    themeStore: themeStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
