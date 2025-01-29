import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../../../../Constants/url";

const initialState = {
  tip: 5,
  isTipAdded: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to add the tip to the server
export const addTipToServer = createAsyncThunk(
  "tip/addTipToServer",
  async ({ token, tip, orderId }, { rejectWithValue }) => {
    try {
      const response = await API.patch(
        "/user/add-tip",
        { tip, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add tip");
    }
  }
);

const tipSlice = createSlice({
  name: "tip",
  initialState,
  reducers: {
    incrementTip: (state) => {
      state.tip += 5;
    },
    decrementTip: (state) => {
      if (state.tip > 5) {
        state.tip -= 5;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTipToServer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTipToServer.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Optionally update state based on the server's response
        state.isTipAdded = true;
      })
      .addCase(addTipToServer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { incrementTip, decrementTip } = tipSlice.actions;

export default tipSlice.reducer;
