import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../../../Constants/url";

const initialState = {
  rideHistory: [],
  error: null,
  loading: null,
};

// Async thunk to add the tip to the server
export const rideHistoryAsyc = createAsyncThunk(
  "ride/history",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await API.get("/user/all-order", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add tip");
    }
  }
);

const rideHistorySlices = createSlice({
  name: "rideHistory",
  initialState,
  reducers: {
    deletRideItme: (state, action) => {
      state.rideHistory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(rideHistoryAsyc.pending, (state) => {
        state.loading = true;
      })
      .addCase(rideHistoryAsyc.fulfilled, (state, action) => {
        state.loading = false;
        state.rideHistory = action.payload;
        state.error = "";
      })
      .addCase(rideHistoryAsyc.rejected, (state, action) => {
        state.loading = false;
        state.rideHistory = [];
        state.error = action.payload || action.error.message;
      });
  },
});

export const { deletRideItme } = rideHistorySlices.actions;

export default rideHistorySlices.reducer;
