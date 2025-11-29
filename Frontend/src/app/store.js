import { configureStore } from "@reduxjs/toolkit";

import jobsReducer from "../features/jobs/jobsSlice";
import servicesReducer from "../features/services/servicesSlice";
import testimonialReducer from "../features/testimonials/testimonialSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    services: servicesReducer,
    testimonials: testimonialReducer,
    auth: authReducer,
  },
});
