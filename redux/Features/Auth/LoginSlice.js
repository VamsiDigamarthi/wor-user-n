import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../Constants/url";

// Async function to get token from AsyncStorage
export const loadToken = createAsyncThunk(
  "auth/loadToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token ? JSON.parse(token) : null;
    } catch (error) {
      console.error("Failed to load token from AsyncStorage", error);
      return rejectWithValue("Failed to load token");
    }
  }
);

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
    isSigningUp: false,
    isLogin: false,
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
    setIsSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
    },

    noToken: (state, action) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isLogin = true;
      })
      .addCase(loadToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLogin = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isSigningUp = false;
        state.isLogin = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLogin = false;
      });
  },
});

export const { logout, setIsSigningUp, setToken, setIsLogin, noToken } =
  tokenSlice.actions;

export default tokenSlice.reducer;
