import { configureStore } from "@reduxjs/toolkit";
import modalStore from "./modal-store";

const store = configureStore({
  reducer: {
    modalStore: modalStore.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
