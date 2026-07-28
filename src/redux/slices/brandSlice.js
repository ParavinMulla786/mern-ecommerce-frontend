import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createBrandApi,
  getAllBrandsApi,
  getActiveBrandsApi,
  getBrandByIdApi,
  updateBrandApi,
  updateBrandStatusApi,
  deleteBrandApi,
} from "../api/brandApi";

/* ======================================================
   Initial State
====================================================== */

const initialState = {
  brands: [],
  selectedBrand: null,

  loading: false,
  success: false,
  error: false,
  message: "",

  totalBrands: 0,

  currentPage: 1,
  totalPages: 1,

  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10, // ✅ Fixed: Default to 10
  },
};

/* ======================================================
   Create Brand
====================================================== */

export const createBrand = createAsyncThunk(
  "brand/createBrand",
  async (formData, thunkAPI) => {
    try {
      const response = await createBrandApi(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Create Brand"
      );
    }
  }
);

/* ======================================================
   Fetch All Brands
====================================================== */

export const fetchBrands = createAsyncThunk(
  "brand/fetchBrands",
  async (params = {}, thunkAPI) => {
    try {
      const response = await getAllBrandsApi(params);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Brands"
      );
    }
  }
);

/* ======================================================
   Fetch Active Brands
====================================================== */

export const fetchActiveBrands = createAsyncThunk(
  "brand/fetchActiveBrands",
  async (_, thunkAPI) => {
    try {
      const response = await getActiveBrandsApi();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Fetch Active Brands"
      );
    }
  }
);

/* ======================================================
   Fetch Brand By ID
====================================================== */

export const fetchBrandById = createAsyncThunk(
  "brand/fetchBrandById",
  async (id, thunkAPI) => {
    try {
      const response = await getBrandByIdApi(id);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Brand Not Found"
      );
    }
  }
);

/* ======================================================
   Update Brand
====================================================== */

export const updateBrand = createAsyncThunk(
  "brand/updateBrand",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await updateBrandApi(id, formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Update Brand"
      );
    }
  }
);

/* ======================================================
   Update Brand Status
====================================================== */

export const updateBrandStatus = createAsyncThunk(
  "brand/updateBrandStatus",
  async ({ id, isActive }, thunkAPI) => {
    try {
      const response = await updateBrandStatusApi(id, isActive); // ✅ Fixed: Both params passed
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Update Brand Status"
      );
    }
  }
);

/* ======================================================
   Delete Brand
====================================================== */

export const deleteBrand = createAsyncThunk(
  "brand/deleteBrand",
  async (id, thunkAPI) => {
    try {
      const response = await deleteBrandApi(id);

      return {
        ...response,
        brandId: id,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to Delete Brand"
      );
    }
  }
);

/* ======================================================
   Slice
====================================================== */

const brandSlice = createSlice({
  name: "brand",

  initialState,

  reducers: {
    clearBrandState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = false;
      state.message = "";
    },

    clearSelectedBrand: (state) => {
      state.selectedBrand = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* ======================================================
         Create Brand
      ====================================================== */

      .addCase(createBrand.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (action.payload.data) {
          state.brands.unshift(action.payload.data);
        }

        state.totalBrands = state.brands.length;

        state.pagination = {
          currentPage: 1,
          totalPages: 1,
          totalItems: state.totalBrands,
          itemsPerPage: 10, // ✅ Fixed: Use 10 instead of state.totalBrands
        };

        state.message =
          action.payload.message || "Brand Created Successfully";
      })

      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ======================================================
         Fetch All Brands
      ====================================================== */

      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // ✅ Fixed: Check if data is an array or nested object
        const data = action.payload.data;
        if (Array.isArray(data)) {
          state.brands = data;
          state.totalBrands = data.length;
        } else if (data && data.brands && Array.isArray(data.brands)) {
          state.brands = data.brands;
          state.totalBrands = data.total || data.brands.length;
          state.currentPage = data.page || 1;
          state.totalPages = data.totalPages || 1;
          
          state.pagination = {
            currentPage: data.page || 1,
            totalPages: data.totalPages || 1,
            totalItems: data.total || data.brands.length,
            itemsPerPage: data.limit || 10, // ✅ Fixed: Get from response or default 10
          };
        } else {
          state.brands = [];
          state.totalBrands = 0;
        }

        // ✅ Fixed: Set pagination with proper values
        if (!state.pagination.itemsPerPage) {
          state.pagination.itemsPerPage = 10;
        }

        state.message =
          action.payload.message || "Brands Loaded";
      })

      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ======================================================
         Fetch Active Brands
      ====================================================== */

      .addCase(fetchActiveBrands.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(fetchActiveBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        // ✅ Fixed: Handle both array and nested object responses
        const data = action.payload.data;
        if (Array.isArray(data)) {
          state.brands = data;
          state.totalBrands = data.length;
        } else if (data && data.brands && Array.isArray(data.brands)) {
          state.brands = data.brands;
          state.totalBrands = data.total || data.brands.length;
        } else {
          state.brands = [];
          state.totalBrands = 0;
        }

        state.pagination = {
          currentPage: 1,
          totalPages: 1,
          totalItems: state.totalBrands,
          itemsPerPage: 10, // ✅ Fixed: Use 10
        };

        state.message =
          action.payload.message || "Active Brands Loaded";
      })

      .addCase(fetchActiveBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ======================================================
         Fetch Brand By ID
      ====================================================== */

      .addCase(fetchBrandById.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(fetchBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.selectedBrand = action.payload.data;

        state.message =
          action.payload.message || "Brand Loaded";
      })

      .addCase(fetchBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ======================================================
         Update Brand
      ====================================================== */

      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedBrand = action.payload.data;

        state.brands = state.brands.map((brand) =>
          brand._id === updatedBrand._id ? updatedBrand : brand
        );

        if (
          state.selectedBrand &&
          state.selectedBrand._id === updatedBrand._id
        ) {
          state.selectedBrand = updatedBrand;
        }

        state.message =
          action.payload.message || "Brand Updated Successfully";
      })

      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ======================================================
         Update Brand Status
      ====================================================== */

      .addCase(updateBrandStatus.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(updateBrandStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        const updatedBrand = action.payload.data;

        state.brands = state.brands.map((brand) =>
          brand._id === updatedBrand._id ? updatedBrand : brand
        );

        if (
          state.selectedBrand &&
          state.selectedBrand._id === updatedBrand._id
        ) {
          state.selectedBrand = updatedBrand;
        }

        state.message =
          action.payload.message || "Brand Status Updated";
      })

      .addCase(updateBrandStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      })

      /* ======================================================
         Delete Brand
      ====================================================== */

      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        state.brands = state.brands.filter(
          (brand) => brand._id !== action.payload.brandId
        );

        state.totalBrands = state.brands.length;

        state.pagination = {
          ...state.pagination,
          totalItems: state.totalBrands,
        };

        if (
          state.selectedBrand &&
          state.selectedBrand._id === action.payload.brandId
        ) {
          state.selectedBrand = null;
        }

        state.message =
          action.payload.message || "Brand Deleted Successfully";
      })

      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});

/* ======================================================
   Actions
====================================================== */

export const {
  clearBrandState,
  clearSelectedBrand,
} = brandSlice.actions;

/* ======================================================
   Selectors
====================================================== */

export const selectBrandState = (state) => state.brand;

export const selectBrands = (state) => state.brand.brands;

export const selectSelectedBrand = (state) =>
  state.brand.selectedBrand;

export const selectBrandLoading = (state) =>
  state.brand.loading;

export const selectBrandSuccess = (state) =>
  state.brand.success;

export const selectBrandError = (state) =>
  state.brand.error;

export const selectBrandMessage = (state) =>
  state.brand.message;

export const selectTotalBrands = (state) =>
  state.brand.totalBrands;

export const selectCurrentPage = (state) =>
  state.brand.currentPage;

export const selectTotalPages = (state) =>
  state.brand.totalPages;

export const selectPagination = (state) =>
  state.brand.pagination;

/* ======================================================
   Reducer
====================================================== */

export default brandSlice.reducer;