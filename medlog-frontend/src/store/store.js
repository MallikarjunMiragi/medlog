// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import logentryReducer from "../reducers/logentryReducer";
import reportsReducer from "../reducers/reportsReducer";
import categoryReducer from "../reducers/categoryReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    logentry: logentryReducer,
    reports: reportsReducer,
    category: categoryReducer,
  },
});

export default store;
