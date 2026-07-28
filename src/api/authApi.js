import axiosInstance from './axiosInstance'

export const registerApi = async (userData) => {
  const response = await axiosInstance.post('/auth/register', userData)
  return response.data
}

export const loginApi = async (credentials) => {
  const response = await axiosInstance.post('/auth/login', credentials)
  return response.data
}

export const getLoggedInUserApi = async () => {
  const response = await axiosInstance.get('/auth/getUserInfo')
  return response.data
}

export const logoutApi = async () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  return { success: true }
}