import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
    FaBars,
    FaSearch,
    FaBell,
    FaEnvelope,
    FaUserCircle,
    FaCog,
    FaSignOutAlt,
    FaMoon,
    FaSun,
    FaChevronDown,
    FaStore,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { logout } from "../../redux/slices/authSlice";

const VendorNavbar = ({ onToggleSidebar }) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    // ===========================================
    // Redux State
    // ===========================================

    const { user } = useSelector(
        (state) => state.auth
    );

    const dashboard = useSelector(
        (state) => state.dashboard
    );

    // ===========================================
    // Local State
    // ===========================================

    const [search, setSearch] = useState("");

    const [showNotifications, setShowNotifications] =
        useState(false);

    const [showMessages, setShowMessages] =
        useState(false);

    const [showProfile, setShowProfile] =
        useState(false);

    const [darkMode, setDarkMode] =
        useState(false);

    // ===========================================
    // Refs
    // ===========================================

    const notificationRef = useRef(null);

    const messageRef = useRef(null);

    const profileRef = useRef(null);

    // ===========================================
    // Vendor Notifications
    // Replace with API later
    // ===========================================

    const notifications = useMemo(
        () => [
            {
                id: 1,
                title: "New Order",
                message: "You received a new order.",
                time: "2 minutes ago",
            },
            {
                id: 2,
                title: "Low Stock",
                message: "Apple iPhone stock is low.",
                time: "20 minutes ago",
            },
            {
                id: 3,
                title: "Payment Received",
                message: "₹15,200 credited successfully.",
                time: "1 hour ago",
            },
        ],
        []
    );

    // ===========================================
    // Vendor Messages
    // Replace with API later
    // ===========================================

    const messages = useMemo(
        () => [
            {
                id: 1,
                sender: "Admin",
                text: "Your product has been approved.",
                time: "5 minutes ago",
            },
            {
                id: 2,
                sender: "Customer",
                text: "Can you dispatch today?",
                time: "35 minutes ago",
            },
        ],
        []
    );

    // ===========================================
    // Dynamic Page Title
    // ===========================================

    const pageTitle = useMemo(() => {
        const path = location.pathname;

        if (path.includes("/vendor/dashboard")) {
            return "Vendor Dashboard";
        }

        if (path.includes("/vendor/products")) {
            return "My Products";
        }

        if (path.includes("/vendor/add-product")) {
            return "Add Product";
        }

        if (path.includes("/vendor/edit-product")) {
            return "Edit Product";
        }

        if (path.includes("/vendor/orders")) {
            return "Orders";
        }

        if (path.includes("/vendor/sales")) {
            return "Sales";
        }

        if (path.includes("/vendor/stock")) {
            return "Stock Management";
        }

        return "Vendor Panel";
    }, [location.pathname]);

    // ===========================================
    // Search
    // ===========================================

    const handleSearch = (e) => {
        e.preventDefault();

        const keyword = search.trim();

        if (!keyword) {
            toast.warning("Please enter a search keyword.");
            return;
        }

        navigate(
            `/vendor/products?search=${encodeURIComponent(keyword)}`
        );
    };

    // ===========================================
    // Logout
    // ===========================================

    const handleLogout = () => {
        dispatch(logout());

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out successfully.");

        navigate("/login");
    };

    // ===========================================
    // Dropdown Toggles
    // ===========================================

    const toggleNotifications = () => {
        setShowNotifications((prev) => !prev);

        setShowMessages(false);
        setShowProfile(false);
    };

    const toggleMessages = () => {
        setShowMessages((prev) => !prev);

        setShowNotifications(false);
        setShowProfile(false);
    };

    const toggleProfile = () => {
        setShowProfile((prev) => !prev);

        setShowNotifications(false);
        setShowMessages(false);
    };

    // ===========================================
    // Theme
    // ===========================================

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    // ===========================================
    // Helper Values
    // ===========================================

    const notificationCount = notifications.length;

    const messageCount = messages.length;

    const userName =
        user?.name ||
        user?.fullName ||
        "Vendor";

    const userEmail =
        user?.email ||
        "vendor@example.com";

    const userImage =
        user?.profileImage ||
        user?.avatar ||
        "";

    const vendorStore =
        user?.storeName ||
        "My Store";

    // ===========================================
    // Theme Initialization
    // ===========================================

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
            setDarkMode(true);
            document.body.classList.add("bg-dark", "text-light");
        }
    }, []);

    // ===========================================
    // Theme Persistence
    // ===========================================

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("bg-dark", "text-light");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("bg-dark", "text-light");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    // ===========================================
    // Close Dropdowns on Outside Click
    // ===========================================

    useEffect(() => {

        const handleOutsideClick = (event) => {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target)
            ) {
                setShowNotifications(false);
            }

            if (
                messageRef.current &&
                !messageRef.current.contains(event.target)
            ) {
                setShowMessages(false);
            }

            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false);
            }

        };

        document.addEventListener(
            "mousedown",
            handleOutsideClick
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );

        };

    }, []);

    // ===========================================
    // JSX Starts
    // ===========================================

    return (

        <nav
            className="
                navbar
                navbar-expand-lg
                navbar-light
                bg-white
                shadow-sm
                sticky-top
                px-3
            "
        >

            <div className="container-fluid">

                {/* Mobile Sidebar Toggle */}

                <button
                    className="
                        btn
                        btn-outline-success
                        d-lg-none
                        me-3
                    "
                    onClick={onToggleSidebar}
                >
                    <FaBars />
                </button>

                {/* Vendor Title */}

                <div className="me-4">

                    <h4 className="mb-0 fw-bold">

                        {pageTitle}

                    </h4>

                    <small className="text-muted">

                        <FaStore className="me-1" />

                        {vendorStore}

                    </small>

                </div>

                {/* Search */}

                <form
                    className="
                        d-none
                        d-md-flex
                        flex-grow-1
                        mx-4
                    "
                    onSubmit={handleSearch}
                >

                    <div className="input-group">

                        <span className="input-group-text">

                            <FaSearch />

                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <button
                            className="btn btn-success"
                            type="submit"
                        >
                            Search
                        </button>

                    </div>

                </form>

                {/* Right Side */}

                <div className="d-flex align-items-center ms-auto">

                    {/* ===========================================
                    Notifications
                    =========================================== */}

                    <div
                        className="dropdown position-relative me-3"
                        ref={notificationRef}
                    >
                        <button
                            type="button"
                            className="btn btn-light position-relative"
                            onClick={toggleNotifications}
                            title="Notifications"
                        >
                            <FaBell size={18} />

                            {notificationCount > 0 && (
                                <span
                                    className="
                                        position-absolute
                                        top-0
                                        start-100
                                        translate-middle
                                        badge
                                        rounded-pill
                                        bg-danger
                                    "
                                >
                                    {notificationCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                            <div
                                className="
                                    dropdown-menu
                                    dropdown-menu-end
                                    show
                                    shadow
                                    border-0
                                "
                                style={{
                                    width: "340px",
                                    maxHeight: "420px",
                                    overflowY: "auto",
                                }}
                            >
                                <div className="px-3 py-2 border-bottom">
                                    <h6 className="mb-0">
                                        Notifications
                                    </h6>
                                </div>

                                {notifications.length === 0 ? (
                                    <div className="text-center text-muted p-4">
                                        No notifications available.
                                    </div>
                                ) : (
                                    notifications.map((item) => (
                                        <div
                                            key={item.id}
                                            className="
                                                dropdown-item
                                                border-bottom
                                                py-3
                                            "
                                        >
                                            <div className="fw-semibold">
                                                {item.title}
                                            </div>

                                            <small className="d-block text-muted">
                                                {item.message}
                                            </small>

                                            <small className="text-secondary">
                                                {item.time}
                                            </small>
                                        </div>
                                    ))
                                )}

                                <div className="text-center py-2">
                                    <Link
                                        to="/vendor/notifications"
                                        className="text-decoration-none"
                                        onClick={() =>
                                            setShowNotifications(false)
                                        }
                                    >
                                        View All Notifications
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ===========================================
                    Messages
                    =========================================== */}

                    <div
                        className="dropdown position-relative me-3"
                        ref={messageRef}
                    >
                        <button
                            type="button"
                            className="btn btn-light position-relative"
                            onClick={toggleMessages}
                            title="Messages"
                        >
                            <FaEnvelope size={18} />

                            {messageCount > 0 && (
                                <span
                                    className="
                                        position-absolute
                                        top-0
                                        start-100
                                        translate-middle
                                        badge
                                        rounded-pill
                                        bg-success
                                    "
                                >
                                    {messageCount}
                                </span>
                            )}
                        </button>

                        {showMessages && (
                            <div
                                className="
                                    dropdown-menu
                                    dropdown-menu-end
                                    show
                                    shadow
                                    border-0
                                "
                                style={{
                                    width: "340px",
                                    maxHeight: "420px",
                                    overflowY: "auto",
                                }}
                            >
                                <div className="px-3 py-2 border-bottom">
                                    <h6 className="mb-0">
                                        Messages
                                    </h6>
                                </div>

                                {messages.length === 0 ? (
                                    <div className="text-center text-muted p-4">
                                        No messages found.
                                    </div>
                                ) : (
                                    messages.map((item) => (
                                        <div
                                            key={item.id}
                                            className="
                                                dropdown-item
                                                border-bottom
                                                py-3
                                            "
                                        >
                                            <div className="fw-semibold">
                                                {item.sender}
                                            </div>

                                            <small className="d-block text-muted">
                                                {item.text}
                                            </small>

                                            <small className="text-secondary">
                                                {item.time}
                                            </small>
                                        </div>
                                    ))
                                )}

                                <div className="text-center py-2">
                                    <Link
                                        to="/vendor/messages"
                                        className="text-decoration-none"
                                        onClick={() =>
                                            setShowMessages(false)
                                        }
                                    >
                                        View All Messages
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ===========================================
                    Theme Toggle
                    =========================================== */}

                    <button
                        type="button"
                        className="btn btn-light me-3"
                        onClick={toggleTheme}
                        title={
                            darkMode
                                ? "Switch to Light Mode"
                                : "Switch to Dark Mode"
                        }
                    >
                        {darkMode ? (
                            <FaSun size={18} />
                        ) : (
                            <FaMoon size={18} />
                        )}
                    </button>

                    {/* ===========================================
                    Vendor Profile
                    =========================================== */}

                    <div
                        className="dropdown position-relative"
                        ref={profileRef}
                    >
                        <button
                            type="button"
                            className="
                                btn
                                btn-light
                                d-flex
                                align-items-center
                                gap-2
                            "
                            onClick={toggleProfile}
                        >
                            {userImage ? (
                                <img
                                    src={userImage}
                                    alt={userName}
                                    width="38"
                                    height="38"
                                    className="rounded-circle"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <FaUserCircle
                                    size={34}
                                    className="text-success"
                                />
                            )}

                            <div
                                className="
                                    d-none
                                    d-md-flex
                                    flex-column
                                    text-start
                                "
                            >
                                <span className="fw-semibold small">
                                    {userName}
                                </span>

                                <small className="text-muted">
                                    Vendor
                                </small>
                            </div>

                            <FaChevronDown />
                        </button>

                        {showProfile && (

                            <div
                                className="
                                    dropdown-menu
                                    dropdown-menu-end
                                    show
                                    shadow
                                    border-0
                                "
                                style={{
                                    minWidth: "270px",
                                }}
                            >

                                {/* User Info */}

                                <div
                                    className="
                                        px-3
                                        py-3
                                        border-bottom
                                    "
                                >
                                    <div className="d-flex">

                                        {userImage ? (

                                            <img
                                                src={userImage}
                                                alt={userName}
                                                width="55"
                                                height="55"
                                                className="
                                                    rounded-circle
                                                    me-3
                                                "
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                            />

                                        ) : (

                                            <FaUserCircle
                                                size={55}
                                                className="
                                                    text-success
                                                    me-3
                                                "
                                            />

                                        )}

                                        <div>

                                            <h6 className="mb-1">
                                                {userName}
                                            </h6>

                                            <small className="text-muted">
                                                {userEmail}
                                            </small>

                                            <div
                                                className="
                                                    text-success
                                                    small
                                                    fw-semibold
                                                    mt-1
                                                "
                                            >
                                                <FaStore className="me-1" />

                                                {vendorStore}
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Menu */}

                                <Link
                                    to="/profile"
                                    className="dropdown-item py-2"
                                    onClick={() =>
                                        setShowProfile(false)
                                    }
                                >
                                    <FaUserCircle className="me-2" />
                                    My Profile
                                </Link>

                                <Link
                                    to="/vendor/settings"
                                    className="dropdown-item py-2"
                                    onClick={() =>
                                        setShowProfile(false)
                                    }
                                >
                                    <FaCog className="me-2" />
                                    Settings
                                </Link>

                                <hr className="dropdown-divider" />

                                <button
                                    type="button"
                                    className="
                                        dropdown-item
                                        text-danger
                                        py-2
                                    "
                                    onClick={handleLogout}
                                >
                                    <FaSignOutAlt className="me-2" />
                                    Logout
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </nav>

    );

};

export default VendorNavbar;