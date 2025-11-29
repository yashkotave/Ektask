import { createSlice } from "@reduxjs/toolkit";

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    list: [
      { id: 1, title: "Web Development", desc: "Full-stack web solutions" },
      { id: 2, title: "Digital Marketing", desc: "Brand growth services" },
      { id: 3, title: "UI/UX Design", desc: "Design modern interfaces" }
    ]
  },
  reducers: {}
});

export default servicesSlice.reducer;
