import { createSlice } from "@reduxjs/toolkit";

interface INITIAL_STATE {
  isModalOpen: boolean;
}

const initialState: INITIAL_STATE = {
  isModalOpen: false,
};

const cardStore = createSlice({
  initialState,
  name: "card-store",
  reducers: {
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { toggleModal } = cardStore.actions;

export default cardStore;
