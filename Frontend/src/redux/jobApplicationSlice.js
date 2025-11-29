import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applications: [],
};

const jobApplicationSlice = createSlice({
  name: "applications",
  initialState,
  reducers: {
    submitApplication: (state, action) => {
      state.applications.push(action.payload);
    },
  },
});

export const { submitApplication } = jobApplicationSlice.actions;
export default jobApplicationSlice.reducer;
