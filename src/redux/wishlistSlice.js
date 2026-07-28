import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getWishlistApi,
  addToWishlistApi,
  removeFromWishlistApi,
  clearWishlistApi,
} from "../api/wishlistApi";

const initialState = {
  items: [],
  totalItems: 0,
  loading: false,
  success: false,
  error: false,
  message: "",
};

// ============================================================
// Fetch Wishlist
// ============================================================

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    try {
      const response = await getWishlistApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Wishlist"
      );
    }
  }
);

// ============================================================
// Add to Wishlist
// ============================================================

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, thunkAPI) => {
    try {
      const response = await addToWishlistApi(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Add to Wishlist"
      );
    }
  }
);

// ============================================================
// Remove from Wishlist
// ============================================================

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, thunkAPI) => {
    try {
      const response = await removeFromWishlistApi(productId);
      return {
        ...response,
        productId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Remove from Wishlist"
      );
    }
  }
);

// ============================================================
// Clear Wishlist
// ============================================================

export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, thunkAPI) => {
    try {
      const response = await clearWishlistApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Clear Wishlist"
      );
    }
  }
);

// ============================================================
// Slice
// ============================================================

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = action.payload.data?.items || [];
        state.totalItems = action.payload.data?.totalItems || 0;
        state.message = action.payload.message || "Wishlist Loaded";
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Add to Wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = action.payload.data?.items || [];
        state.totalItems = action.payload.data?.totalItems || 0;
        state.message = action.payload.message || "Added to Wishlist";
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Remove from Wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = state.items.filter(
          (item) => item._id !== action.payload.productId
        );
        state.totalItems = state.items.length;
        state.message = action.payload.message || "Removed from Wishlist";
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Clear Wishlist
      .addCase(clearWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items = [];
        state.totalItems = 0;
        state.message = action.payload.message || "Wishlist Cleared";
      })
      .addCase(clearWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { clearWishlistState } = wishlistSlice.actions;

export const selectWishlistState = (state) => state.wishlist;
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistTotalItems = (state) => state.wishlist.totalItems;

export default wishlistSlice.reducer;