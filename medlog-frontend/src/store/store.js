import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import logentryReducer from "../reducers/logentryReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    logentry: logentryReducer,
  },
});

export default store;
