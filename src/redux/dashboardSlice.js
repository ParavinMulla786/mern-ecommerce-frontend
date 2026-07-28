import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDashboardStatsApi,
  getAdminDashboardApi,
  getVendorDashboardApi,
} from "../api/dashboardApi";

const initialState = {
  stats: null,
  adminStats: null,
  vendorStats: null,
  loading: false,
  success: false,
  error: false,
  message: "",
};

// ============================================================
// Fetch Dashboard Stats
// ============================================================

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, thunkAPI) => {
    try {
      const response = await getDashboardStatsApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Dashboard Stats"
      );
    }
  }
);

// ============================================================
// Fetch Admin Dashboard
// ============================================================

export const fetchAdminDashboard = createAsyncThunk(
  "dashboard/fetchAdminDashboard",
  async (_, thunkAPI) => {
    try {
      const response = await getAdminDashboardApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Admin Dashboard"
      );
    }
  }
);

// ============================================================
// Fetch Vendor Dashboard
// ============================================================

export const fetchVendorDashboard = createAsyncThunk(
  "dashboard/fetchVendorDashboard",
  async (_, thunkAPI) => {
    try {
      const response = await getVendorDashboardApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Vendor Dashboard"
      );
    }
  }
);

// ============================================================
// Slice
// ============================================================

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.stats = action.payload.data;
        state.message = action.payload.message || "Dashboard Stats Loaded";
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Fetch Admin Dashboard
      .addCase(fetchAdminDashboard.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.adminStats = action.payload.data;
        state.message = action.payload.message || "Admin Dashboard Loaded";
      })
      .addCase(fetchAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Fetch Vendor Dashboard
      .addCase(fetchVendorDashboard.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchVendorDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.vendorStats = action.payload.data;
        state.message = action.payload.message || "Vendor Dashboard Loaded";
      })
      .addCase(fetchVendorDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { clearDashboardState } = dashboardSlice.actions;

export const selectDashboardState = (state) => state.dashboard;
export const selectDashboardStats = (state) => state.dashboard.stats;
export const selectAdminStats = (state) => state.dashboard.adminStats;
export const selectVendorStats = (state) => state.dashboard.vendorStats;

export default dashboardSlice.reducer;