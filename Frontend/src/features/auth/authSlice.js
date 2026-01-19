import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/admin";

// Async thunk for admin login
export const adminLogin = createAsyncThunk(
  "auth/adminLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      // Store token in localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminData", JSON.stringify(data.admin));

      return data;
    } catch (error) {
      return rejectWithValue("Network error. Please try again.");
    }
  },
);

// Async thunk to verify token
export const verifyAdminToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        return rejectWithValue("No token found");
      }

      const response = await fetch(`${API_URL}/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue("Network error. Please try again.");
    }
  },
);

// Check if admin is already logged in
const token = localStorage.getItem("adminToken");
const adminData = localStorage.getItem("adminData");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAdmin: !!token,
    admin: adminData ? JSON.parse(adminData) : null,
    token: token || null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin: (state) => {
      state.isAdmin = false;
      state.admin = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(adminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdmin = true;
        state.admin = action.payload.admin;
        state.token = action.payload.token;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify Token
      .addCase(verifyAdminToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAdminToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAdmin = true;
      })
      .addCase(verifyAdminToken.rejected, (state) => {
        state.loading = false;
        state.isAdmin = false;
        state.admin = null;
        state.token = null;
      });
  },
});

export const { logoutAdmin, clearError } = authSlice.actions;
export default authSlice.reducer;
