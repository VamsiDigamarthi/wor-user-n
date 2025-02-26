import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  homeOrWorkPlacetype: null,
  isEditHomePlaces: false,
  editPlaceId: null,
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
      state.isEditHomePlaces = false;
      state.editPlaceId = null;
    },
    setEditHomePlaces: (state, action) => {
      state.isEditHomePlaces = action.payload;
    },
    setEditPlaceId: (state, action) => {
      state.editPlaceId = action.payload;
    },
  },
});

export const {
  setHomeOrWorkPlaceType,
  clearHomeOrWorkPlace,
  setEditHomePlaces,
  setEditPlaceId,
} = homeWorkPlaceSlices.actions;

export default homeWorkPlaceSlices.reducer;
