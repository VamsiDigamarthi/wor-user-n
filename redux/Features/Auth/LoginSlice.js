import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../Constants/url";

// Async function for user login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ mobile, otp, termsAndCondition }, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/verify-otp", {
        mobile,
        otp,
        termsAndCondition,
      });
      await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

const tokenSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: true,
    error: null,
  },
  reducers: {
    logout: (state) => {
      console.log("kjhgf");
      state.token = null;
      state.isSigningUp = false;
      AsyncStorage.removeItem("token");
    },

    setToken: (state, action) => {
      state.token = action.payload;
      state.loading = false;
    },
    noToken: (state, action) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLogin = false;
      });
  },
});

export const { logout, setToken, noToken } = tokenSlice.actions;

export default tokenSlice.reducer;
