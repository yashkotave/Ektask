import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import jobApplicationReducer from "./jobApplicationSlice";
import jobReducer from "./jobSlice";
import serviceReducer from "./serviceSlice";
import testimonialReducer from "./testimonialSlice";

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    services: serviceReducer,
    testimonials: testimonialReducer,
    applications: jobApplicationReducer,
    auth: authReducer,
  },
});
