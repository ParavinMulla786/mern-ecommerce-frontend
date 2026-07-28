import axiosInstance from './axiosInstance'

// Admin Dashboard
export const getAdminDashboardApi = async () => {
  const response = await axiosInstance.get('/dashboard/admin')
  return response.data
}

// Vendor Dashboard
export const getVendorDashboardApi = async () => {
  const response = await axiosInstance.get('/dashboard/vendor')
  return response.data
}