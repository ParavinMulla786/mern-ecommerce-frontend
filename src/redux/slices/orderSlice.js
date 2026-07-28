import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  placeOrderApi,
  getMyOrdersApi,
  getOrderByIdApi,
  cancelOrderApi,
} from '../../api/orderApi'

const initialState = {
  orders: [],
  selectedOrder: null,
  totalOrders: 0,
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
}

// Async thunks
export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await placeOrderApi(orderData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to place order')
    }
  }
)

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMyOrders',
  async (params, { rejectWithValue }) => {
    try {
      const response = await getMyOrdersApi(params)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await getOrderByIdApi(orderId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order')
    }
  }
)

export const cancelOrder = createAsyncThunk(
  'orders/cancelOrder',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await cancelOrderApi(orderId)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel order')
    }
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearSelectedOrder: (state) => {
      state.selectedOrder = null
    },
    clearError: (state) => {
      state.error = null
    },
    resetOrderState: (state) => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      // Place Order
      .addCase(placeOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = [action.payload, ...state.orders]
        state.selectedOrder = action.payload
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch My Orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.isLoading = false
        state.orders = action.payload.orders || []
        state.totalOrders = action.payload.pagination?.totalOrders || 0
        state.currentPage = action.payload.pagination?.currentPage || 1
        state.totalPages = action.payload.pagination?.totalPages || 1
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch Order By ID
      .addCase(fetchOrderById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selectedOrder = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.orders.findIndex(o => o._id === action.payload._id)
        if (index !== -1) {
          state.orders[index] = action.payload
        }
        if (state.selectedOrder?._id === action.payload._id) {
          state.selectedOrder = action.payload
        }
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  },
})

export const { clearSelectedOrder, clearError, resetOrderState } = orderSlice.actions
export default orderSlice.reducer