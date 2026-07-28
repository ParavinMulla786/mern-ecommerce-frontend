import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getMyCartApi,
  addToCartApi,
  updateQuantityApi,
  increaseQuantityApi,
  decreaseQuantityApi,
  removeFromCartApi,
  clearCartApi,
  getCartCountApi,
  getCartTotalApi,
} from '../../api/cartApi'

const initialState = {
  cart: null,
  items: [],
  totalItems: 0,
  totalQuantity: 0,
  subtotal: 0,
  totalDiscount: 0,
  totalAmount: 0,
  isLoading: false,
  error: null,
}

// Async thunks
export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getMyCartApi()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get cart')
    }
  }
)

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await addToCartApi(productId, quantity)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to cart')
    }
  }
)

export const updateCartQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateQuantityApi(productId, quantity)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update quantity')
    }
  }
)

export const increaseCartQuantity = createAsyncThunk(
  'cart/increaseQuantity',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await increaseQuantityApi(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to increase quantity')
    }
  }
)

export const decreaseCartQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await decreaseQuantityApi(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to decrease quantity')
    }
  }
)

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await removeFromCartApi(productId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from cart')
    }
  }
)

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCartApi()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart')
    }
  }
)

export const getCartCount = createAsyncThunk(
  'cart/getCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartCountApi()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get cart count')
    }
  }
)

export const getCartTotal = createAsyncThunk(
  'cart/getTotal',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCartTotalApi()
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to get cart total')
    }
  }
)

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = null
      state.items = []
      state.totalItems = 0
      state.totalQuantity = 0
      state.subtotal = 0
      state.totalDiscount = 0
      state.totalAmount = 0
    },
    resetCartState: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Cart
      .addCase(getCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart = action.payload
        state.items = action.payload.items || []
        state.totalItems = action.payload.totalItems || 0
        state.totalQuantity = action.payload.totalQuantity || 0
        state.subtotal = action.payload.subtotal || 0
        state.totalDiscount = action.payload.totalDiscount || 0
        state.totalAmount = action.payload.totalAmount || 0
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart = action.payload
        state.items = action.payload.items || []
        state.totalItems = action.payload.totalItems || 0
        state.totalQuantity = action.payload.totalQuantity || 0
        state.subtotal = action.payload.subtotal || 0
        state.totalDiscount = action.payload.totalDiscount || 0
        state.totalAmount = action.payload.totalAmount || 0
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Quantity
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart = action.payload
        state.items = action.payload.items || []
        state.totalItems = action.payload.totalItems || 0
        state.totalQuantity = action.payload.totalQuantity || 0
        state.subtotal = action.payload.subtotal || 0
        state.totalDiscount = action.payload.totalDiscount || 0
        state.totalAmount = action.payload.totalAmount || 0
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false
        state.cart = action.payload
        state.items = action.payload.items || []
        state.totalItems = action.payload.totalItems || 0
        state.totalQuantity = action.payload.totalQuantity || 0
        state.subtotal = action.payload.subtotal || 0
        state.totalDiscount = action.payload.totalDiscount || 0
        state.totalAmount = action.payload.totalAmount || 0
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false
        state.cart = { items: [], totalItems: 0, totalQuantity: 0, subtotal: 0, totalDiscount: 0, totalAmount: 0 }
        state.items = []
        state.totalItems = 0
        state.totalQuantity = 0
        state.subtotal = 0
        state.totalDiscount = 0
        state.totalAmount = 0
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Get Cart Count
      .addCase(getCartCount.fulfilled, (state, action) => {
        // Just update count if needed
      })
      // Get Cart Total
      .addCase(getCartTotal.fulfilled, (state, action) => {
        // Just update total if needed
      })
  },
})

export const { clearCartState, resetCartState } = cartSlice.actions
export default cartSlice.reducer