import React, {
    lazy,
    Suspense
} from "react";

import {
    Routes,
    Route
} from "react-router-dom";

// ===============================
// Layouts
// ===============================

import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import VendorLayout from "../layouts/VendorLayout";
import AuthLayout from "../layouts/AuthLayout";

// ===============================
// Route Guards
// ===============================

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import VendorRoute from "./VendorRoute";
import CustomerRoute from "./CustomerRoute";

// ===============================
// Common Components
// ===============================

import Loader from "../components/common/Loader";

// ===============================
// Error Pages
// ===============================

const NotFound = lazy(() =>
    import("../pages/error/NotFound")
);

const Unauthorized = lazy(() =>
    import("../pages/error/Unauthorized")
);

// ===============================
// Authentication Pages
// ===============================

const Login = lazy(() =>
    import("../pages/auth/Login")
);

const Register = lazy(() =>
    import("../pages/auth/Register")
);

const ForgotPassword = lazy(() =>
    import("../pages/auth/ForgotPassword")
);

const ResetPassword = lazy(() =>
    import("../pages/auth/ResetPassword")
);

// ===============================
// Public Pages
// ===============================

const Home = lazy(() =>
    import("../pages/home/Home")
);

const Shop = lazy(() =>
    import("../pages/shop/Shop")
);

const SearchResult = lazy(() =>
    import("../pages/shop/SearchResult")
);

const ProductDetails = lazy(() =>
    import("../pages/product/ProductDetails")
);

// ===============================
// Customer Pages
// ===============================

const Cart = lazy(() =>
    import("../pages/cart/Cart")
);

const Checkout = lazy(() =>
    import("../pages/checkout/Checkout")
);

const Wishlist = lazy(() =>
    import("../pages/wishlist/Wishlist")
);

const MyOrders = lazy(() =>
    import("../pages/order/MyOrders")
);

const OrderDetails = lazy(() =>
    import("../pages/order/OrderDetails")
);

const Profile = lazy(() =>
    import("../pages/profile/Profile")
);

// ===============================
// Admin Pages
// ===============================

const AdminDashboard = lazy(() =>
    import("../pages/admin/Dashboard")
);

const Users = lazy(() =>
    import("../pages/admin/Users")
);

const Vendors = lazy(() =>
    import("../pages/admin/Vendors")
);

const Brands = lazy(() =>
    import("../pages/admin/Brands")
);

const Categories = lazy(() =>
    import("../pages/admin/Categories")
);

const Products = lazy(() =>
    import("../pages/admin/Products")
);

const Orders = lazy(() =>
    import("../pages/admin/Orders")
);

const Reviews = lazy(() =>
    import("../pages/admin/Reviews")
);

const Reports = lazy(() =>
    import("../pages/admin/Reports")
);

// ===============================
// Vendor Pages
// ===============================

const VendorDashboard = lazy(() =>
    import("../pages/vendor/Dashboard")
);

const VendorProducts = lazy(() =>
    import("../pages/vendor/Products")
);

const AddProduct = lazy(() =>
    import("../pages/vendor/AddProduct")
);

const EditProduct = lazy(() =>
    import("../pages/vendor/EditProduct")
);

const VendorOrders = lazy(() =>
    import("../pages/vendor/Orders")
);

const Sales = lazy(() =>
    import("../pages/vendor/Sales")
);

const Stock = lazy(() =>
    import("../pages/vendor/Stock")
);

// ===============================
// App Routes
// ===============================

const AppRoutes = () => {

    return (

        <Suspense fallback={<Loader />}>

            <Routes>

                {/* Authentication */}

                <Route element={<AuthLayout />}>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />

                    <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                    />

                </Route>

                {/* Main Layout */}

                <Route element={<MainLayout />}>

                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/shop"
                        element={<Shop />}
                    />

                    <Route
                        path="/search"
                        element={<SearchResult />}
                    />

                    <Route
                        path="/product/:id"
                        element={<ProductDetails />}
                    />

                    <Route element={<ProtectedRoute />}>

                        <Route element={<CustomerRoute />}>

                            <Route
                                path="/cart"
                                element={<Cart />}
                            />

                            <Route
                                path="/checkout"
                                element={<Checkout />}
                            />

                            <Route
                                path="/wishlist"
                                element={<Wishlist />}
                            />

                            <Route
                                path="/orders"
                                element={<MyOrders />}
                            />

                            <Route
                                path="/orders/:id"
                                element={<OrderDetails />}
                            />

                            <Route
                                path="/profile"
                                element={<Profile />}
                            />

                        </Route>

                    </Route>

                </Route>

                {/* Admin */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<AdminRoute />}>

                        <Route element={<AdminLayout />}>

                            <Route
                                path="/admin/dashboard"
                                element={<AdminDashboard />}
                            />

                            <Route
                                path="/admin/users"
                                element={<Users />}
                            />

                            <Route
                                path="/admin/vendors"
                                element={<Vendors />}
                            />

                            <Route
                                path="/admin/brands"
                                element={<Brands />}
                            />

                            <Route
                                path="/admin/categories"
                                element={<Categories />}
                            />

                            <Route
                                path="/admin/products"
                                element={<Products />}
                            />

                            <Route
                                path="/admin/orders"
                                element={<Orders />}
                            />

                            <Route
                                path="/admin/reviews"
                                element={<Reviews />}
                            />

                            <Route
                                path="/admin/reports"
                                element={<Reports />}
                            />

                        </Route>

                    </Route>

                </Route>

                {/* Vendor */}

                <Route element={<ProtectedRoute />}>

                    <Route element={<VendorRoute />}>

                        <Route element={<VendorLayout />}>

                            <Route
                                path="/vendor/dashboard"
                                element={<VendorDashboard />}
                            />

                            <Route
                                path="/vendor/products"
                                element={<VendorProducts />}
                            />

                            <Route
                                path="/vendor/add-product"
                                element={<AddProduct />}
                            />

                            <Route
                                path="/vendor/edit-product/:id"
                                element={<EditProduct />}
                            />

                            <Route
                                path="/vendor/orders"
                                element={<VendorOrders />}
                            />

                            <Route
                                path="/vendor/sales"
                                element={<Sales />}
                            />

                            <Route
                                path="/vendor/stock"
                                element={<Stock />}
                            />

                        </Route>

                    </Route>

                </Route>

                {/* Error */}

                <Route
                    path="/unauthorized"
                    element={<Unauthorized />}
                />

                <Route
                    path="*"
                    element={<NotFound />}
                />

            </Routes>

        </Suspense>

    );

};

export default AppRoutes;