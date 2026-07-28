import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createReviewApi,
  getReviewsApi,
  getReviewByIdApi,
  updateReviewApi,
  deleteReviewApi,
} from "../api/reviewApi";

const initialState = {
  reviews: [],
  selectedReview: null,
  loading: false,
  success: false,
  error: false,
  message: "",
  totalReviews: 0,
  averageRating: 0,
};

// ============================================================
// Create Review
// ============================================================

export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ productId, reviewData }, thunkAPI) => {
    try {
      const response = await createReviewApi(productId, reviewData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Create Review"
      );
    }
  }
);

// ============================================================
// Fetch Reviews
// ============================================================

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async ({ productId, params }, thunkAPI) => {
    try {
      const response = await getReviewsApi(productId, params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Reviews"
      );
    }
  }
);

// ============================================================
// Fetch Review By ID
// ============================================================

export const fetchReviewById = createAsyncThunk(
  "review/fetchReviewById",
  async (reviewId, thunkAPI) => {
    try {
      const response = await getReviewByIdApi(reviewId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Review Not Found"
      );
    }
  }
);

// ============================================================
// Update Review
// ============================================================

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, reviewData }, thunkAPI) => {
    try {
      const response = await updateReviewApi(reviewId, reviewData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Update Review"
      );
    }
  }
);

// ============================================================
// Delete Review
// ============================================================

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, thunkAPI) => {
    try {
      const response = await deleteReviewApi(reviewId);
      return {
        ...response,
        reviewId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Delete Review"
      );
    }
  }
);

// ============================================================
// Slice
// ============================================================

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviewState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
    clearSelectedReview: (state) => {
      state.selectedReview = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Review
      .addCase(createReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reviews.unshift(action.payload.data);
        state.totalReviews += 1;
        state.message = action.payload.message || "Review Created";
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reviews = action.payload.data || [];
        state.totalReviews = action.payload.totalReviews || 0;
        state.averageRating = action.payload.averageRating || 0;
        state.message = action.payload.message || "Reviews Loaded";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Fetch Review By ID
      .addCase(fetchReviewById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReviewById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.selectedReview = action.payload.data;
        state.message = action.payload.message || "Review Loaded";
      })
      .addCase(fetchReviewById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Update Review
      .addCase(updateReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedReview = action.payload.data;
        state.reviews = state.reviews.map((review) =>
          review._id === updatedReview._id ? updatedReview : review
        );
        if (state.selectedReview && state.selectedReview._id === updatedReview._id) {
          state.selectedReview = updatedReview;
        }
        state.message = action.payload.message || "Review Updated";
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.reviews = state.reviews.filter(
          (review) => review._id !== action.payload.reviewId
        );
        state.totalReviews = state.totalReviews > 0 ? state.totalReviews - 1 : 0;
        if (state.selectedReview && state.selectedReview._id === action.payload.reviewId) {
          state.selectedReview = null;
        }
        state.message = action.payload.message || "Review Deleted";
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

export const { clearReviewState, clearSelectedReview } = reviewSlice.actions;

export const selectReviewState = (state) => state.review;
export const selectReviews = (state) => state.review.reviews;
export const selectAverageRating = (state) => state.review.averageRating;

export default reviewSlice.reducer;