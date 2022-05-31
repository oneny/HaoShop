import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  }
});

export default modalSlice.reducer;