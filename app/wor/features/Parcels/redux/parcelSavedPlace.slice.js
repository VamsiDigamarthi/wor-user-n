import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../../Constants/url";

const initialState = {
  savedPlaces: null,
  loading: false,
  error: null,
};

export const fetchSavedPlace = createAsyncThunk(
  "ride/history",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/saved-address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add tip");
    }
  }
);

const savedPlaceSlice = createSlice({
  name: "savedPlace",
  initialState,
  reducers: {
    setSavedPlaces: (state, action) => {
      state.savedPlaces = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedPlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSavedPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.savedPlaces = action.payload;
        state.error = "";
      })
      .addCase(fetchSavedPlace.rejected, (state, action) => {
        state.loading = false;
        state.savedPlaces = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setSavedPlaces } = savedPlaceSlice.actions;
export default savedPlaceSlice.reducer;
