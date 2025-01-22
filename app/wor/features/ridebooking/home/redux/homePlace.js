import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../../../../Constants/url";

const initialState = {
  loading: false,
  homePlace: null,
  workPlace: null,
  error: "",
};

export const homePlace = createAsyncThunk(
  "admin/homeplace",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/auth/home-place", {
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

const homePlaceSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(homePlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(homePlace.fulfilled, (state, action) => {
        state.loading = false;
        state.homePlace = action.payload?.home;
        state.workPlace = action.payload?.work;
        state.error = "";
      })
      .addCase(homePlace.rejected, (state, action) => {
        state.loading = false;
        state.homePlace = null;
        state.workPlace = null;
        state.error = action.payload || action.error.message;
      });
  },
});

export default homePlaceSlice.reducer;
