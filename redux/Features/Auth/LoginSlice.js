import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../../Constants/url";

// Async function to get token from AsyncStorage
export const loadToken = createAsyncThunk(
  "auth/loadToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token ? JSON.parse(token) : null; // Return parsed token if found
    } catch (error) {
      console.error("Failed to load token from AsyncStorage", error);
      return rejectWithValue("Failed to load token");
    }
  }
);

// Async function to handle user login
export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ mobile, otp, navigate }, { rejectWithValue }) => {
    try {
      const response = await API.post("/auth/verify-otp", { mobile, otp });
      await AsyncStorage.setItem("token", JSON.stringify(response.data.token)); // Save token

      // navigate("otp"); // Navigate to OTP screen
      return response.data;
    } catch (error) {
      navigate("signup");
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

// Create token slice
const tokenSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null; // Clear token
      AsyncStorage.removeItem("token"); // Remove token from AsyncStorage
    },
  },
  extraReducers: (builder) => {
    // Handle loading token from AsyncStorage
    builder
      .addCase(loadToken.pending, (state) => {
        state.loading = true; // Set loading state
      })
      .addCase(loadToken.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false
        state.token = action.payload; // Set the token from AsyncStorage
      })
      .addCase(loadToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error state
      });

    // Handle user login logic
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token; // Set the token from the API response
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export the logout action
export const { logout } = tokenSlice.actions;

export default tokenSlice.reducer;
