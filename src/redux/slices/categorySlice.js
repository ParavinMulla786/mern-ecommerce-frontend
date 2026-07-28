import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllCategoriesApi,
  getActiveCategoriesApi,
  getCategoryByIdApi,
  createCategoryApi,
  updateCategoryApi,
  updateCategoryStatusApi,
  deleteCategoryApi,
} from "../api/categoryApi";

/* =====================================================
   Initial State
===================================================== */

const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  success: false,
  error: false,
  message: "",
  totalCategories: 0,
  currentPage: 1,
  totalPages: 1,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

/* =====================================================
   Fetch All Categories
===================================================== */

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (params, thunkAPI) => {
    try {
      const response = await getAllCategoriesApi(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to Fetch Categories"
      );
    }
  }
);

/* =====================================================
   Fetch Active Categories
===================================================== */

export const fetchActiveCategories = createAsyncThunk(
  "category/fetchActiveCategories",
  async (_, thunkAPI) => {
    try {
      const response = await getActiveCategoriesApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to Fetch Active Categories"
      );
    }
  }
);

/* =====================================================
   Fetch Category By ID
===================================================== */

export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async (categoryId, thunkAPI) => {
    try {
      const response = await getCategoryByIdApi(categoryId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Category Not Found"
      );
    }
  }
);

/* =====================================================
   Create Category
===================================================== */

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (categoryData, thunkAPI) => {
    try {
      const response = await createCategoryApi(categoryData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to Create Category"
      );
    }
  }
);

/* =====================================================
   Update Category
===================================================== */

export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ categoryId, categoryData }, thunkAPI) => {
    try {
      const response = await updateCategoryApi(categoryId, categoryData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to Update Category"
      );
    }
  }
);

/* =====================================================
   Update Category Status
===================================================== */

export const updateCategoryStatus = createAsyncThunk(
  "category/updateCategoryStatus",
  async (categoryId, thunkAPI) => {
    try {
      const response = await updateCategoryStatusApi(categoryId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to Update Category Status"
      );
    }
  }
);

/* =====================================================
   Delete Category
===================================================== */

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (categoryId, thunkAPI) => {
    try {
      const response = await deleteCategoryApi(categoryId);
      return {
        ...response,
        categoryId,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Unable to Delete Category"
      );
    }
  }
);

/* =====================================================
   Slice
===================================================== */

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategoryState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },
    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = action.payload.data || [];
        state.totalCategories = action.payload.totalCategories || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.totalPages = action.payload.totalPages || 1;
        state.pagination = {
          currentPage: action.payload.currentPage || 1,
          totalPages: action.payload.totalPages || 1,
          totalItems: action.payload.totalCategories || 0,
          itemsPerPage: action.payload.limit || 10,
        };
        state.message = action.payload.message || "Categories Loaded Successfully";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(fetchActiveCategories.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchActiveCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = action.payload.data || [];
        state.message = action.payload.message || "Active Categories Loaded";
      })
      .addCase(fetchActiveCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.selectedCategory = action.payload.data;
        state.message = action.payload.message || "Category Loaded Successfully";
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (action.payload.data) {
          state.categories.unshift(action.payload.data);
          state.totalCategories += 1;
          state.pagination.totalItems = state.totalCategories;
        }
        state.message = action.payload.message || "Category Created Successfully";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedCategory = action.payload.data;
        state.categories = state.categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        );
        if (state.selectedCategory && state.selectedCategory._id === updatedCategory._id) {
          state.selectedCategory = updatedCategory;
        }
        state.message = action.payload.message || "Category Updated Successfully";
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(updateCategoryStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const updatedCategory = action.payload.data;
        state.categories = state.categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        );
        if (state.selectedCategory && state.selectedCategory._id === updatedCategory._id) {
          state.selectedCategory = updatedCategory;
        }
        state.message = action.payload.message || "Category Status Updated";
      })
      .addCase(updateCategoryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.categoryId
        );
        if (state.totalCategories > 0) {
          state.totalCategories -= 1;
          state.pagination.totalItems = state.totalCategories;
        }
        if (state.selectedCategory && state.selectedCategory._id === action.payload.categoryId) {
          state.selectedCategory = null;
        }
        state.message = action.payload.message || "Category Deleted Successfully";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

/* =====================================================
   Actions
===================================================== */

export const { clearCategoryState, clearSelectedCategory } = categorySlice.actions;

/* =====================================================
   Selectors
===================================================== */

export const selectCategoryState = (state) => state.category;
export const selectCategories = (state) => state.category.categories;
export const selectSelectedCategory = (state) => state.category.selectedCategory;
export const selectCategoryLoading = (state) => state.category.loading;
export const selectCategorySuccess = (state) => state.category.success;
export const selectCategoryError = (state) => state.category.error;
export const selectCategoryMessage = (state) => state.category.message;
export const selectTotalCategories = (state) => state.category.totalCategories;
export const selectCurrentPage = (state) => state.category.currentPage;
export const selectTotalPages = (state) => state.category.totalPages;
export const selectPagination = (state) => state.category.pagination;

/* =====================================================
   Reducer
===================================================== */

export default categorySlice.reducer;