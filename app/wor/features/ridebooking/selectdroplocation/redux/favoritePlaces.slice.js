import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../../../../Constants/url";

const initialState = {
  loading: false,
  favoritePlaces: null,
  error: "",
};

export const onFavoritePlace = createAsyncThunk(
  "admin/favorite-place",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/favorites-places", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token here
        },
      });

      return response.data;
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const favoritePlacesSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(onFavoritePlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(onFavoritePlace.fulfilled, (state, action) => {
        state.loading = false;
        state.favoritePlaces = action.payload;
        state.error = "";
      })
      .addCase(onFavoritePlace.rejected, (state, action) => {
        state.loading = false;
        state.favoritePlaces = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export default favoritePlacesSlice.reducer;
