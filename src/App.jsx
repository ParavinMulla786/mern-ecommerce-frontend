import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { getLoggedInUser } from './redux/slices/authSlice'
import { getCart } from './redux/slices/cartSlice'

// Layouts
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import VendorLayout from './layouts/VendorLayout'

// Pages
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import OrderDetails from './pages/OrderDetails'
import NotFound from './pages/NotFound'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import UserList from './pages/admin/UserList'
import BrandList from './pages/admin/BrandList'
import AddBrand from './pages/admin/AddBrand'
import CategoryList from './pages/admin/CategoryList'
import AddCategory from './pages/admin/AddCategory'
import ProductList from './pages/admin/ProductList'
import AddProduct from './pages/admin/AddProduct'
import OrderList from './pages/admin/OrderList'
import ReviewManagement from './pages/admin/ReviewManagement'

// Vendor Pages
import VendorDashboard from './pages/vendor/VendorDashboard'
import VendorProducts from './pages/vendor/VendorProducts'
import AddProductVendor from './pages/vendor/AddProduct'
import EditProduct from './pages/vendor/EditProduct'
import VendorOrders from './pages/vendor/VendorOrders'

// Routes
import ProtectedRoute from './routes/ProtectedRoute'
import RoleBasedRoute from './routes/RoleBasedRoute'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, token } = useSelector((state) => state.auth)

  useEffect(() => {
    if (token) {
      dispatch(getLoggedInUser())
      dispatch(getCart())
    }
  }, [dispatch, token])

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Protected Routes - Customer Only */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="order/:id" element={<OrderDetails />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
          <Route element={<AdminLayout />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/users" element={<UserList />} />
            <Route path="admin/brands" element={<BrandList />} />
            <Route path="admin/brands/add" element={<AddBrand />} />
            <Route path="admin/brands/edit/:id" element={<AddBrand />} />
            <Route path="admin/categories" element={<CategoryList />} />
            <Route path="admin/categories/add" element={<AddCategory />} />
            <Route path="admin/categories/edit/:id" element={<AddCategory />} />
            <Route path="admin/products" element={<ProductList />} />
            <Route path="admin/products/add" element={<AddProduct />} />
            <Route path="admin/products/edit/:id" element={<AddProduct />} />
            <Route path="admin/orders" element={<OrderList />} />
            <Route path="admin/reviews" element={<ReviewManagement />} />
          </Route>
        </Route>

        {/* Vendor Routes */}
        <Route element={<RoleBasedRoute allowedRoles={['vendor', 'admin']} />}>
          <Route element={<VendorLayout />}>
            <Route path="vendor" element={<VendorDashboard />} />
            <Route path="vendor/products" element={<VendorProducts />} />
            <Route path="vendor/products/add" element={<AddProductVendor />} />
            <Route path="vendor/products/edit/:id" element={<EditProduct />} />
            <Route path="vendor/orders" element={<VendorOrders />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App