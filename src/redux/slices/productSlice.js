import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAllProductsApi,
  getProductByIdApi,
  searchProductsApi,
  filterProductsApi,
  getProductsByCategoryApi,
  getProductsByBrandApi,  // Now this exists
} from '../../api/productApi'

const initialState = {
  products: [],
  selectedProduct: null,
  featuredProducts: [],
  latestProducts: [],
  topRatedProducts: [],
  totalProducts: 0,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
}

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getAllProductsApi(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getProductByIdApi(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
    }
  }
)

export const searchProducts = createAsyncThunk(
  'products/search',
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchProductsApi(query)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Search failed')
    }
  }
)

export const filterProducts = createAsyncThunk(
  'products/filter',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await filterProductsApi(filters)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Filter failed')
    }
  }
)

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await getProductsByCategoryApi(categoryId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch category products')
    }
  }
)

export const fetchProductsByBrand = createAsyncThunk(
  'products/fetchByBrand',
  async (brandId, { rejectWithValue }) => {
    try {
      const response = await getProductsByBrandApi(brandId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch brand products')
    }
  }
)

// Slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products || []
        state.totalProducts = action.payload.pagination?.totalProducts || 0
        state.currentPage = action.payload.pagination?.currentPage || 1
        state.totalPages = action.payload.pagination?.totalPages || 1
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch Product By ID
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedProduct = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Search Products
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products || []
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Filter Products
      .addCase(filterProducts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(filterProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload.products || []
        state.totalProducts = action.payload.pagination?.totalProducts || 0
        state.currentPage = action.payload.pagination?.currentPage || 1
        state.totalPages = action.payload.pagination?.totalPages || 1
      })
      .addCase(filterProducts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch Products By Category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload || []
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch Products By Brand
      .addCase(fetchProductsByBrand.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload || []
      })
      .addCase(fetchProductsByBrand.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearSelectedProduct, clearError } = productSlice.actions
export default productSlice.reducer