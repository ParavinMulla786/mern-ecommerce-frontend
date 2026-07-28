import axiosInstance from './axiosInstance'

// Add to Cart
export const addToCartApi = async (productId, quantity) => {
  const response = await axiosInstance.post('/cart/addToCart', { productId, quantity })
  return response.data
}

// Get My Cart
export const getMyCartApi = async () => {
  const response = await axiosInstance.get('/cart/getMyCart')
  return response.data
}

// Update Quantity
export const updateQuantityApi = async (productId, quantity) => {
  const response = await axiosInstance.put(`/cart/updateQuantity/${productId}`, { quantity })
  return response.data
}

// Increase Quantity
export const increaseQuantityApi = async (productId) => {
  const response = await axiosInstance.put(`/cart/increaseQuantity/${productId}`)
  return response.data
}

// Decrease Quantity
export const decreaseQuantityApi = async (productId) => {
  const response = await axiosInstance.put(`/cart/decreaseQuantity/${productId}`)
  return response.data
}

// Remove from Cart
export const removeFromCartApi = async (productId) => {
  const response = await axiosInstance.delete(`/cart/removeFromCart/${productId}`)
  return response.data
}

// Clear Cart
export const clearCartApi = async () => {
  const response = await axiosInstance.delete('/cart/clearCart')
  return response.data
}

// Get Cart Count
export const getCartCountApi = async () => {
  const response = await axiosInstance.get('/cart/getCartCount')
  return response.data
}

// Get Cart Total
export const getCartTotalApi = async () => {
  const response = await axiosInstance.get('/cart/getCartTotal')
  return response.data
}