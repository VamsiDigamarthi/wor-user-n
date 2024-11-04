import { configureStore } from "@reduxjs/toolkit";

import token from "./Features/Auth/LoginSlice";

const store = configureStore({
  reducer: {
    token,
  },
});

export default store;
