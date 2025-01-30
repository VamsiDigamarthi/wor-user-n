import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  homeOrWorkPlacetype: null,
};

const homeWorkPlaceSlices = createSlice({
  name: "homePlaceType",
  initialState,
  reducers: {
    setHomeOrWorkPlaceType: (state, action) => {
      state.homeOrWorkPlacetype = action.payload;
    },
    clearHomeOrWorkPlace: (state) => {
      state.homeOrWorkPlacetype = null;
    },
  },
});

export const { setHomeOrWorkPlaceType, clearHomeOrWorkPlace } =
  homeWorkPlaceSlices.actions;

export default homeWorkPlaceSlices.reducer;
