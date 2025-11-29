import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    list: [
      { id: 1, title: "Frontend Developer", desc: "Build UI Components" },
      { id: 2, title: "Backend Developer", desc: "Build APIs & Server" },
      { id: 3, title: "Graphic Designer", desc: "Design Creative Visuals" }
    ],
    selectedJob: null
  },
  reducers: {
    selectJob: (state, action) => {
      state.selectedJob = action.payload;
    }
  }
});

export const { selectJob } = jobsSlice.actions;
export default jobsSlice.reducer;
