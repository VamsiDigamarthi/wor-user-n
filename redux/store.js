import { configureStore } from "@reduxjs/toolkit";

import token from "./Features/Auth/LoginSlice";
import profileSlice from "./Features/Auth/ProfileSlice";

const store = configureStore({
  reducer: {
    token,
    profileSlice,
  },
});

export default store;
