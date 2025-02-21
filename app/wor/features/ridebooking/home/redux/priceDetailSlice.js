import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../../../../Constants/url";

const initialState = {
  loading: false,
  priceDetails: null,
  error: "",
};

export const fetchPriceDetails = createAsyncThunk(
  "admin/price-details",
  async ({ _ }, { rejectWithValue }) => {
    try {
      const response = await API.get("/price-details");

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

const priceDetailSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPriceDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.priceDetails = action.payload;
        state.error = "";
      })
      .addCase(fetchPriceDetails.rejected, (state, action) => {
        state.loading = false;
        state.priceDetails = null;
        state.error = action.payload || action.error.message;
      });
  },
});

export default priceDetailSlice.reducer;
