import axiosInstance from './axiosInstance'

// Place Order
export const placeOrderApi = async (orderData) => {
  const response = await axiosInstance.post('/orders/placeOrder', orderData)
  return response.data
}

// Get My Orders
export const getMyOrdersApi = async (params) => {
  const response = await axiosInstance.get('/orders/getMyOrders', { params })
  return response.data
}

// Get Order by ID
export const getOrderByIdApi = async (orderId) => {
  const response = await axiosInstance.get(`/orders/getOrderById/${orderId}`)
  return response.data
}

// Get Order Status
export const getOrderStatusApi = async (orderId) => {
  const response = await axiosInstance.get(`/orders/getOrderStatus/${orderId}`)
  return response.data
}

// Cancel Order
export const cancelOrderApi = async (orderId) => {
  const response = await axiosInstance.put(`/orders/cancelOrder/${orderId}`)
  return response.data
}

// Get Vendor Orders (Vendor)
export const getVendorOrdersApi = async (params) => {
  const response = await axiosInstance.get('/orders/getVendorOrders', { params })
  return response.data
}

// Get All Orders (Admin)
export const getAllOrdersApi = async (params) => {
  const response = await axiosInstance.get('/orders/getAllOrders', { params })
  return response.data
}

// Update Order Status (Admin)
export const updateOrderStatusApi = async (orderId, orderStatus) => {
  const response = await axiosInstance.put(`/orders/updateOrderStatus/${orderId}`, { orderStatus })
  return response.data
}

// Get Order Summary (Admin)
export const getOrderSummaryApi = async () => {
  const response = await axiosInstance.get('/orders/getOrderSummary')
  return response.data
}