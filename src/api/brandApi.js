import axiosInstance from './axiosInstance'

// Create Brand (Admin)
export const createBrandApi = async (brandData) => {
  const response = await axiosInstance.post('/brands/createBrand', brandData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Get All Brands
export const getAllBrandsApi = async (params) => {
  const response = await axiosInstance.get('/brands/getAllBrands', { params })
  return response.data
}

// Get Active Brands
export const getActiveBrandsApi = async () => {
  const response = await axiosInstance.get('/brands/getActiveBrands')
  return response.data
}

// Get Brand by ID
export const getBrandByIdApi = async (brandId) => {
  const response = await axiosInstance.get(`/brands/getBrandById/${brandId}`)
  return response.data
}

// Get Brand Products
export const getBrandProductsApi = async (brandId, params) => {
  const response = await axiosInstance.get(`/brands/getBrandProducts/${brandId}`, { params })
  return response.data
}

// Update Brand (Admin)
export const updateBrandApi = async (brandId, brandData) => {
  const response = await axiosInstance.put(`/brands/updateBrand/${brandId}`, brandData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Update Brand Status (Admin)
export const updateBrandStatusApi = async (brandId, isActive) => {
  const response = await axiosInstance.put(`/brands/updateBrandStatus/${brandId}`, { isActive })
  return response.data
}

// Delete Brand (Admin)
export const deleteBrandApi = async (brandId) => {
  const response = await axiosInstance.delete(`/brands/deleteBrand/${brandId}`)
  return response.data
}