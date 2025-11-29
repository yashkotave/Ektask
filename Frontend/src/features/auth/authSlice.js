import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAdmin: false,
  },
  reducers: {
    loginAdmin: (state) => { state.isAdmin = true; },
    logoutAdmin: (state) => { state.isAdmin = false; },
  }
});

export const { loginAdmin, logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
