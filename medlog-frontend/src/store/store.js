import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import logentryReducer from "../reducers/logentryReducer";
import reportsReducer from "../reducers/reportsReducer"; // Import the new reducer

const store = configureStore({
  reducer: {
    auth: authReducer,
    logentry: logentryReducer,
    reports: reportsReducer, // Add reportsReducer to the store
  },
});

export default store;
