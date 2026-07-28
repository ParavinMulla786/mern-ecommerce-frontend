// Order Status Constants
export const ORDER_STATUS = {
  PLACED: 'placed',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PLACED]: 'Placed',
  [ORDER_STATUS.CONFIRMED]: 'Confirmed',
  [ORDER_STATUS.PROCESSING]: 'Processing',
  [ORDER_STATUS.SHIPPED]: 'Shipped',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'Out for Delivery',
  [ORDER_STATUS.DELIVERED]: 'Delivered',
  [ORDER_STATUS.CANCELLED]: 'Cancelled',
}

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PLACED]: 'primary',
  [ORDER_STATUS.CONFIRMED]: 'info',
  [ORDER_STATUS.PROCESSING]: 'warning',
  [ORDER_STATUS.SHIPPED]: 'info',
  [ORDER_STATUS.OUT_FOR_DELIVERY]: 'warning',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'danger',
}

// Payment Methods
export const PAYMENT_METHODS = {
  CASH_ON_DELIVERY: 'cash_on_delivery',
  ONLINE: 'online',
}

export const PAYMENT_METHOD_LABELS = {
  [PAYMENT_METHODS.CASH_ON_DELIVERY]: 'Cash on Delivery',
  [PAYMENT_METHODS.ONLINE]: 'Online Payment',
}

// User Roles
export const ROLES = {
  ADMIN: 'admin',
  VENDOR: 'vendor',
  CUSTOMER: 'customer',
}

export const ROLE_LABELS = {
  [ROLES.ADMIN]: 'Admin',
  [ROLES.VENDOR]: 'Vendor',
  [ROLES.CUSTOMER]: 'Customer',
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    GET_USER: '/auth/getUserInfo',
    CHANGE_PASSWORD: '/auth/changePassword',
    FORGOT_PASSWORD: '/auth/forgotPassword',
    RESET_PASSWORD: '/auth/resetPassword',
  },
  USERS: {
    GET_ALL: '/users/getAllUsers',
    GET_BY_ID: '/users/getUserById',
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/updateProfile',
    UPLOAD_IMAGE: '/users/uploadProfileImage',
    UPDATE_ROLE: '/users/updateRole',
    UPDATE_STATUS: '/users/updateStatus',
    DELETE: '/users/deleteUser',
  },
  PRODUCTS: {
    CREATE: '/products/createProduct',
    GET_ALL: '/products/getAllProducts',
    GET_ACTIVE: '/products/getActiveProducts',
    GET_FEATURED: '/products/getFeaturedProducts',
    GET_LATEST: '/products/getLatestProducts',
    GET_TOP_RATED: '/products/getTopRatedProducts',
    GET_BY_ID: '/products/getProductById',
    SEARCH: '/products/search',
    FILTER: '/products/filter',
    GET_BY_CATEGORY: '/products/getProductsByCategory',
    GET_BY_BRAND: '/products/getProductsByBrand',
    GET_BY_VENDOR: '/products/getProductsByVendor',
    GET_MY_PRODUCTS: '/products/getMyProducts',
    UPDATE: '/products/updateProduct',
    UPDATE_STATUS: '/products/updateProductStatus',
    DELETE: '/products/deleteProduct',
  },
  CART: {
    ADD: '/cart/addToCart',
    GET: '/cart/getMyCart',
    UPDATE_QUANTITY: '/cart/updateQuantity',
    INCREASE: '/cart/increaseQuantity',
    DECREASE: '/cart/decreaseQuantity',
    REMOVE: '/cart/removeFromCart',
    CLEAR: '/cart/clearCart',
    COUNT: '/cart/getCartCount',
    TOTAL: '/cart/getCartTotal',
  },
  ORDERS: {
    PLACE: '/orders/placeOrder',
    GET_MY: '/orders/getMyOrders',
    GET_BY_ID: '/orders/getOrderById',
    GET_STATUS: '/orders/getOrderStatus',
    CANCEL: '/orders/cancelOrder',
    GET_VENDOR: '/orders/getVendorOrders',
    GET_ALL: '/orders/getAllOrders',
    UPDATE_STATUS: '/orders/updateOrderStatus',
    SUMMARY: '/orders/getOrderSummary',
  },
  REVIEWS: {
    ADD: '/reviews/addReview',
    GET_PRODUCT: '/reviews/getProductReviews',
    GET_BY_ID: '/reviews/getReviewById',
    UPDATE: '/reviews/updateReview',
    DELETE: '/reviews/deleteReview',
    GET_ALL: '/reviews/getAllReviews',
  },
  BRANDS: {
    CREATE: '/brands/createBrand',
    GET_ALL: '/brands/getAllBrands',
    GET_ACTIVE: '/brands/getActiveBrands',
    GET_BY_ID: '/brands/getBrandById',
    GET_PRODUCTS: '/brands/getBrandProducts',
    UPDATE: '/brands/updateBrand',
    UPDATE_STATUS: '/brands/updateBrandStatus',
    DELETE: '/brands/deleteBrand',
  },
  CATEGORIES: {
    CREATE: '/categories/createCategory',
    GET_ALL: '/categories/getAllCategories',
    GET_ACTIVE: '/categories/getActiveCategories',
    GET_BY_ID: '/categories/getCategoryById',
    GET_PRODUCTS: '/categories/getCategoryProducts',
    UPDATE: '/categories/updateCategory',
    UPDATE_STATUS: '/categories/updateCategoryStatus',
    DELETE: '/categories/deleteCategory',
  },
  DASHBOARD: {
    ADMIN: '/dashboard/admin',
    VENDOR: '/dashboard/vendor',
  },
}