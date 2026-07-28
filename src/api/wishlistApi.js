import axiosInstance from "./axios";

// Get Wishlist
export const getWishlistApi = async () => {
  const response = await axiosInstance.get("/wishlist");
  return response.data;
};

// Add to Wishlist
export const addToWishlistApi = async (productId) => {
  const response = await axiosInstance.post("/wishlist", { productId });
  return response.data;
};

// Remove from Wishlist
export const removeFromWishlistApi = async (productId) => {
  const response = await axiosInstance.delete(`/wishlist/${productId}`);
  return response.data;
};

// Clear Wishlist
export const clearWishlistApi = async () => {
  const response = await axiosInstance.delete("/wishlist");
  return response.data;
};