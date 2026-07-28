import axiosInstance from './axiosInstance'

// Create Category (Admin)
export const createCategoryApi = async (categoryData) => {
  const response = await axiosInstance.post('/categories/createCategory', categoryData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Get All Categories (Admin)
export const getAllCategoriesApi = async (params) => {
  const response = await axiosInstance.get('/categories/getAllCategories', { params })
  return response.data
}

// Get Active Categories
export const getActiveCategoriesApi = async () => {
  const response = await axiosInstance.get('/categories/getActiveCategories')
  return response.data
}

// Get Category by ID
export const getCategoryByIdApi = async (categoryId) => {
  const response = await axiosInstance.get(`/categories/getCategoryById/${categoryId}`)
  return response.data
}

// Get Category Products
export const getCategoryProductsApi = async (categoryId, params) => {
  const response = await axiosInstance.get(`/categories/getCategoryProducts/${categoryId}`, { params })
  return response.data
}

// Update Category (Admin)
export const updateCategoryApi = async (categoryId, categoryData) => {
  const response = await axiosInstance.put(`/categories/updateCategory/${categoryId}`, categoryData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Update Category Status (Admin)
export const updateCategoryStatusApi = async (categoryId, isActive) => {
  const response = await axiosInstance.put(`/categories/updateCategoryStatus/${categoryId}`, { isActive })
  return response.data
}

// Delete Category (Admin)
export const deleteCategoryApi = async (categoryId) => {
  const response = await axiosInstance.delete(`/categories/deleteCategory/${categoryId}`)
  return response.data
}