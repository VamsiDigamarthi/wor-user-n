import { configureStore } from "@reduxjs/toolkit";

import token from "./Features/Auth/LoginSlice";
import profileSlice from "./Features/Auth/ProfileSlice";
import previewOrders from "./Features/Auth/PreviousOrders";
const store = configureStore({
  reducer: {
    token,
    profileSlice,
    previewOrders,
  },
});

export default store;
