import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../../../../../Constants/url";

const initialState = {
  loading: false,
  chat: null,
  error: "",
};

export const supportChat = createAsyncThunk(
  "captain/supportChat",
  async ({ token }, { rejectWithValue }) => {
    // console.log("inside profile slice", token);
    try {
      const response = await API.get("/support-chat", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token here
        },
      });

      return response.data;
    } catch (err) {
      console.log("error in profile slide", err.response.data.message);
      if (err.response && err.response.data && err.response.data.message) {
        return rejectWithValue(err.response.data.message);
      } else {
        return rejectWithValue(err.message);
      }
    }
  }
);

const supportChatSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(supportChat.pending, (state) => {
        state.loading = true;
      })
      .addCase(supportChat.fulfilled, (state, action) => {
        state.loading = false;
        state.chat = action.payload;
        state.error = "";
      })
      .addCase(supportChat.rejected, (state, action) => {
        state.loading = false;
        state.chat = {};
        state.error = action.payload || action.error.message;
      });
  },
});

export default supportChatSlice.reducer;
