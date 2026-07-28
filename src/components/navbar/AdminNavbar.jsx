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
} from "react-icons/fa";

import { toast } from "react-toastify";

import { logout } from "../../redux/authSlice";

const AdminNavbar = ({ onToggleSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // ==========================
    // Redux State
    // ==========================

    const { user } = useSelector((state) => state.auth);

    const dashboard = useSelector((state) => state.dashboard);

    // ==========================
    // Local State
    // ==========================

    const [search, setSearch] = useState("");

    const [showNotifications, setShowNotifications] = useState(false);

    const [showMessages, setShowMessages] = useState(false);

    const [showProfile, setShowProfile] = useState(false);

    const [darkMode, setDarkMode] = useState(false);

    // ==========================
    // Refs
    // ==========================

    const notificationRef = useRef(null);

    const messageRef = useRef(null);

    const profileRef = useRef(null);

    // ==========================
    // Dummy Notifications
    // Replace later with API
    // ==========================

    const notifications = useMemo(
        () => [
            {
                id: 1,
                title: "New Order",
                message: "Order #1458 received.",
                time: "2 min ago",
            },
            {
                id: 2,
                title: "Vendor Registered",
                message: "A new vendor joined.",
                time: "12 min ago",
            },
            {
                id: 3,
                title: "Product Approved",
                message: "Apple iPhone approved.",
                time: "1 hour ago",
            },
        ],
        []
    );

    // ==========================
    // Dummy Messages
    // Replace later with API
    // ==========================

    const messages = useMemo(
        () => [
            {
                id: 1,
                sender: "Vendor Support",
                text: "Need approval for products.",
                time: "5 min ago",
            },
            {
                id: 2,
                sender: "Customer",
                text: "Order delivery delayed.",
                time: "30 min ago",
            },
        ],
        []
    );

    // ==========================
    // Page Title
    // ==========================

    const pageTitle = useMemo(() => {
        const path = location.pathname;

        if (path.includes("/admin/dashboard")) return "Dashboard";
        if (path.includes("/admin/users")) return "Users";
        if (path.includes("/admin/vendors")) return "Vendors";
        if (path.includes("/admin/products")) return "Products";
        if (path.includes("/admin/categories")) return "Categories";
        if (path.includes("/admin/brands")) return "Brands";
        if (path.includes("/admin/orders")) return "Orders";
        if (path.includes("/admin/reviews")) return "Reviews";
        if (path.includes("/admin/reports")) return "Reports";

        return "Admin Panel";
    }, [location.pathname]);

    // ==========================
    // Event Handlers
    // ==========================

    const handleSearch = (e) => {
        e.preventDefault();

        if (!search.trim()) {
            toast.warning("Please enter a search term.");
            return;
        }

        navigate(`/shop?search=${encodeURIComponent(search.trim())}`);
    };

    const handleLogout = () => {
        dispatch(logout());

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out successfully.");

        navigate("/login");
    };

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

    const toggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

    // ==========================================
    // Effects
    // ==========================================

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");

        if (storedTheme === "dark") {
            setDarkMode(true);
            document.body.classList.add("bg-dark", "text-light");
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("bg-dark", "text-light");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("bg-dark", "text-light");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

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

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleOutsideClick
            );
        };
    }, []);

    // ==========================================
    // Helpers
    // ==========================================

    const notificationCount = notifications.length;

    const messageCount = messages.length;

    const userName =
        user?.name ||
        user?.fullName ||
        "Administrator";

    const userEmail =
        user?.email ||
        "admin@example.com";

    const userImage =
        user?.profileImage ||
        user?.avatar ||
        "";

    // ==========================================
    // JSX Starts
    // ==========================================

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
                        btn-outline-primary
                        d-lg-none
                        me-3
                    "
                    onClick={onToggleSidebar}
                >
                    <FaBars />
                </button>

                {/* Page Title */}

                <div className="me-4">

                    <h4 className="mb-0 fw-bold">

                        {pageTitle}

                    </h4>

                    <small className="text-muted">

                        Welcome back, {userName}

                    </small>

                </div>

                {/* Search */}

                <form
                    onSubmit={handleSearch}
                    className="
                        d-none
                        d-md-flex
                        flex-grow-1
                        mx-4
                    "
                >

                    <div className="input-group">

                        <span className="input-group-text">

                            <FaSearch />

                        </span>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search products, users, orders..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            Search
                        </button>

                    </div>

                </form>

                {/* Right Section */}

                <div className="d-flex align-items-center ms-auto">

                    {/* ==========================
                    Notifications
                    ========================== */}

                    <div
                        className="dropdown position-relative me-3"
                        ref={notificationRef}
                    >
                        <button
                            type="button"
                            className="btn btn-light position-relative"
                            onClick={toggleNotifications}
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
                                className="dropdown-menu dropdown-menu-end show shadow"
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
                                    <div className="p-3 text-center text-muted">
                                        No notifications found.
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
                                        to="/admin/notifications"
                                        className="text-decoration-none"
                                    >
                                        View All Notifications
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ==========================
                    Messages
                    ========================== */}

                    <div
                        className="dropdown position-relative me-3"
                        ref={messageRef}
                    >
                        <button
                            type="button"
                            className="btn btn-light position-relative"
                            onClick={toggleMessages}
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
                                className="dropdown-menu dropdown-menu-end show shadow"
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
                                    <div className="p-3 text-center text-muted">
                                        No messages available.
                                    </div>
                                ) : (
                                    messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className="
                                                dropdown-item
                                                border-bottom
                                                py-3
                                            "
                                        >
                                            <div className="fw-semibold">
                                                {msg.sender}
                                            </div>

                                            <small className="d-block text-muted">
                                                {msg.text}
                                            </small>

                                            <small className="text-secondary">
                                                {msg.time}
                                            </small>
                                        </div>
                                    ))
                                )}

                                <div className="text-center py-2">
                                    <Link
                                        to="/admin/messages"
                                        className="text-decoration-none"
                                    >
                                        View All Messages
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ==========================
                    Theme Toggle
                    ========================== */}

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

                    {/* ==========================
                    Profile Dropdown
                    ========================== */}

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
                                    className="rounded-circle"
                                    width="38"
                                    height="38"
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            ) : (
                                <FaUserCircle
                                    size={34}
                                    className="text-primary"
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
                                <span
                                    className="
                                        fw-semibold
                                        small
                                    "
                                >
                                    {userName}
                                </span>

                                <small
                                    className="text-muted"
                                >
                                    Administrator
                                </small>
                            </div>

                            <FaChevronDown
                                className="text-secondary"
                            />
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

                                {/* User Information */}

                                <div
                                    className="
                                        px-3
                                        py-3
                                        border-bottom
                                    "
                                >
                                    <div
                                        className="
                                            d-flex
                                            align-items-center
                                        "
                                    >
                                        {userImage ? (
                                            <img
                                                src={userImage}
                                                alt={userName}
                                                width="55"
                                                height="55"
                                                className="rounded-circle me-3"
                                                style={{
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            <FaUserCircle
                                                size={55}
                                                className="
                                                    text-primary
                                                    me-3
                                                "
                                            />
                                        )}

                                        <div>

                                            <h6 className="mb-1">

                                                {userName}

                                            </h6>

                                            <small
                                                className="text-muted"
                                            >
                                                {userEmail}
                                            </small>

                                        </div>

                                    </div>

                                </div>

                                {/* Menu Items */}

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
                                    to="/admin/settings"
                                    className="dropdown-item py-2"
                                    onClick={() =>
                                        setShowProfile(false)
                                    }
                                >
                                    <FaCog className="me-2" />
                                    Settings
                                </Link>

                                <hr className="dropdown-divider" />

                                {/* Logout */}

                                <button
                                    type="button"
                                    className="dropdown-item text-danger py-2"
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

export default AdminNavbar;