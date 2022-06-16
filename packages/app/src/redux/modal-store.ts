import { createSlice } from "@reduxjs/toolkit";

interface INITIAL_STATE {
  isModalOpen: boolean;
}

const initialState: INITIAL_STATE = {
  isModalOpen: false,
};

const modalStore = createSlice({
  initialState,
  name: "modalStore",
  reducers: {
    close: (state) => {
      state.isModalOpen = false;
    },
    open: (state) => {
      state.isModalOpen = true;
    },
  },
});

export const { open, close } = modalStore.actions;

export default modalStore;
