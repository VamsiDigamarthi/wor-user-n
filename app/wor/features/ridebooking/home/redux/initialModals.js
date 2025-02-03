import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisplayAadharModal: false,
  isDisplayMPinModal: false,
};

const initialModals = createSlice({
  name: "initialModals",
  initialState,
  reducers: {
    setDisplayAadharModal: (state, action) => {
      state.isDisplayAadharModal = action.payload;
    },
    setDisplayMPinModal: (state, action) => {
      state.isDisplayMPinModal = action.payload;
    },
  },
});

export const { setDisplayAadharModal, setDisplayMPinModal } =
  initialModals.actions;

export default initialModals.reducer;
