import axiosInstance from './axiosInstance'

// Add Review
export const addReviewApi = async (reviewData) => {
  const response = await axiosInstance.post('/reviews/addReview', reviewData)
  return response.data
}

// Get Product Reviews
export const getProductReviewsApi = async (productId, params) => {
  const response = await axiosInstance.get(`/reviews/getProductReviews/${productId}`, { params })
  return response.data
}

// Get Review by ID
export const getReviewByIdApi = async (reviewId) => {
  const response = await axiosInstance.get(`/reviews/getReviewById/${reviewId}`)
  return response.data
}

// Update Review
export const updateReviewApi = async (reviewId, reviewData) => {
  const response = await axiosInstance.put(`/reviews/updateReview/${reviewId}`, reviewData)
  return response.data
}

// Delete Review
export const deleteReviewApi = async (reviewId) => {
  const response = await axiosInstance.delete(`/reviews/deleteReview/${reviewId}`)
  return response.data
}

// Get All Reviews (Admin)
export const getAllReviewsApi = async (params) => {
  const response = await axiosInstance.get('/reviews/getAllReviews', { params })
  return response.data
}