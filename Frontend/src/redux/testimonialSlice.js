import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  testimonialList: [
    { name: "Rahul Verma", review: "Amazing service!", rating: 5 },
    { name: "Sneha Singh", review: "Very professional!", rating: 5 },
    { name: "Mohit Sharma", review: "Loved the experience!", rating: 4 },
    { name: "Anjali Gupta", review: "Got job instantly!", rating: 5 },
    { name: "Ramesh Patel", review: "Very helpful team!", rating: 5 },
    { name: "Priya Mehra", review: "Great platform!", rating: 5 },
    { name: "Karan Choudhary", review: "Very smooth process!", rating: 4 },
  ],
};

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    addTestimonial: (state, action) => {
      state.testimonialList.push(action.payload);
    },
  },
});

export const { addTestimonial } = testimonialSlice.actions;
export default testimonialSlice.reducer;
