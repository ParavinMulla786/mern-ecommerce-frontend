import axiosInstance from './axiosInstance'

// Create Product
export const createProductApi = async (productData) => {
  const response = await axiosInstance.post('/products/createProduct', productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Get All Products
export const getAllProductsApi = async (params) => {
  const response = await axiosInstance.get('/products/getAllProducts', { params })
  return response.data
}

// Get Active Products
export const getActiveProductsApi = async () => {
  const response = await axiosInstance.get('/products/getActiveProducts')
  return response.data
}

// Get Featured Products
export const getFeaturedProductsApi = async () => {
  const response = await axiosInstance.get('/products/getFeaturedProducts')
  return response.data
}

// Get Latest Products
export const getLatestProductsApi = async () => {
  const response = await axiosInstance.get('/products/getLatestProducts')
  return response.data
}

// Get Top Rated Products
export const getTopRatedProductsApi = async () => {
  const response = await axiosInstance.get('/products/getTopRatedProducts')
  return response.data
}

// Get Product by ID
export const getProductByIdApi = async (productId) => {
  const response = await axiosInstance.get(`/products/getProductById/${productId}`)
  return response.data
}

// Search Products
export const searchProductsApi = async (query) => {
  const response = await axiosInstance.get(`/products/search?query=${query}`)
  return response.data
}

// Filter Products
export const filterProductsApi = async (params) => {
  const response = await axiosInstance.get('/products/filter', { params })
  return response.data
}

// Get Products by Category
export const getProductsByCategoryApi = async (categoryId) => {
  const response = await axiosInstance.get(`/products/getProductsByCategory/${categoryId}`)
  return response.data
}

// Get Products by Brand
export const getProductsByBrandApi = async (brandId) => {
  const response = await axiosInstance.get(`/products/getProductsByBrand/${brandId}`)
  return response.data
}

// Get Products by Vendor
export const getProductsByVendorApi = async (vendorId) => {
  const response = await axiosInstance.get(`/products/getProductsByVendor/${vendorId}`)
  return response.data
}

// Get My Products (Vendor)
export const getMyProductsApi = async () => {
  const response = await axiosInstance.get('/products/getMyProducts')
  return response.data
}

// Update Product
export const updateProductApi = async (productId, productData) => {
  const response = await axiosInstance.put(`/products/updateProduct/${productId}`, productData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Update Product Status
export const updateProductStatusApi = async (productId, isAvailable) => {
  const response = await axiosInstance.put(`/products/updateProductStatus/${productId}`, { isAvailable })
  return response.data
}

// Delete Product
export const deleteProductApi = async (productId) => {
  const response = await axiosInstance.delete(`/products/deleteProduct/${productId}`)
  return response.data
}