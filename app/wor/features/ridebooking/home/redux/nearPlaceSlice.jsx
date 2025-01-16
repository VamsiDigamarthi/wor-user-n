import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nearPlaces: [],
};

const nearPlaceSlice = createSlice({
  name: "nearPlace",
  initialState,
  reducers: {
    setNearPlaces: (state, action) => {
      state.nearPlaces = action.payload;
    },
    clearNearPlaces: (state) => {
      state.nearPlaces = [];
    },
  },
});

export const { setNearPlaces, clearNearPlaces } = nearPlaceSlice.actions;

export default nearPlaceSlice.reducer;
