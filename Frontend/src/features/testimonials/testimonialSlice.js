import { createSlice } from "@reduxjs/toolkit";

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    list: [
      {
        id: 1,
        name: "Rahul Verma",
        review: "Excellent platform!",
        rating: 5
      },
      {
        id: 2,
        name: "Sneha Singh",
        review: "Very easy hiring process!",
        rating: 4
      }
    ]
  },
  reducers: {}
});

export default testimonialSlice.reducer;

