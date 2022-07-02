import { configureStore } from '@reduxjs/toolkit';
import cartStore from './cartStore';

const store = configureStore({
  reducer: {
    modalStore: cartStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
