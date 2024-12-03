import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../Constants/url";

const tokenSlice = createSlice({
  name: "previousOrders",
  initialState: {
    loading: false,
    previousOrders: [],
    error: "",
  },
  reducers: {
    setOrders: (state, action) => {
      state.previousOrders = action.payload;
      state.loading = false;
    },
    noOrders: (state) => {
      state.loading = false;
    },
  },
});

export const { setOrders, noOrders } = tokenSlice.actions;

export default tokenSlice.reducer;
