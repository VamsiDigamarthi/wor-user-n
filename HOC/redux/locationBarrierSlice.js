import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDisplayLocationBarrierModal: false,
};

const locationBarrier = createSlice({
  name: "location-barrier",
  initialState,
  reducers: {
    setLocationBarrierModal: (state, action) => {
      state.isDisplayLocationBarrierModal = action.payload;
    },
  },
});

export const { setLocationBarrierModal } = locationBarrier.actions;

export default locationBarrier.reducer;
