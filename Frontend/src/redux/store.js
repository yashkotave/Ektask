import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./jobSlice";
import serviceReducer from "./serviceSlice";
import testimonialReducer from "./testimonialSlice";
import jobApplicationReducer from "./jobApplicationSlice";


export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    services: serviceReducer,
    testimonials: testimonialReducer,
     applications: jobApplicationReducer, 
  },
});
