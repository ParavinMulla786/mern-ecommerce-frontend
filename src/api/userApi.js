import axiosInstance from './axiosInstance'

// Get All Users (Admin)
export const getAllUsersApi = async (params) => {
  const response = await axiosInstance.get('/users/getAllUsers', { params })
  return response.data
}

// Get User by ID (Admin)
export const getUserByIdApi = async (userId) => {
  const response = await axiosInstance.get(`/users/getUserById/${userId}`)
  return response.data
}

// Get My Profile
export const getMyProfileApi = async () => {
  const response = await axiosInstance.get('/users/profile')
  return response.data
}

// Update Profile
export const updateProfileApi = async (userData) => {
  const response = await axiosInstance.put('/users/updateProfile', userData)
  return response.data
}

// Upload Profile Image
export const uploadProfileImageApi = async (file) => {
  const formData = new FormData()
  formData.append('profileImage', file)
  
  const response = await axiosInstance.put('/users/uploadProfileImage', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}

// Update User Role (Admin)
export const updateUserRoleApi = async (userId, role) => {
  const response = await axiosInstance.put(`/users/updateRole/${userId}`, { role })
  return response.data
}

// Update User Status (Admin)
export const updateUserStatusApi = async (userId, isActive) => {
  const response = await axiosInstance.put(`/users/updateStatus/${userId}`, { isActive })
  return response.data
}

// Delete User (Admin)
export const deleteUserApi = async (userId) => {
  const response = await axiosInstance.delete(`/users/deleteUser/${userId}`)
  return response.data
}

// Get Vendors (Admin)
export const getVendorsApi = async () => {
  const response = await axiosInstance.get('/users/getVendors')
  return response.data
}

// Get Customers (Admin)
export const getCustomersApi = async () => {
  const response = await axiosInstance.get('/users/getCustomers')
  return response.data
}

// Get User Stats (Admin)
export const getUserStatsApi = async () => {
  const response = await axiosInstance.get('/users/getUserStats')
  return response.data
}