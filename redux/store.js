import { configureStore } from "@reduxjs/toolkit";

import token from "./Features/Auth/LoginSlice";
import profileSlice from "./Features/Auth/ProfileSlice";
import previewOrders from "./Features/Auth/PreviousOrders";
import location from "./Features/Location/LocationSlice";
const store = configureStore({
  reducer: {
    token,
    profileSlice,
    previewOrders,
    location,
  },
});

export default store;
