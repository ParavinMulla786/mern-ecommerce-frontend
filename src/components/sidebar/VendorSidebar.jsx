import React, { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    FaBars,
    FaTimes,
    FaStore,
    FaBoxOpen,
    FaPlusCircle,
    FaShoppingBag,
    FaChartLine,
    FaWarehouse,
    FaUserCircle,
    FaKey,
    FaChevronDown,
    FaChevronRight,
    FaSignOutAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";

import { logout } from "../../redux/slices/authSlice";

const VendorSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);

    const [menus, setMenus] = useState({
        products: true,
        account: false,
    });

    const menuItems = useMemo(
        () => [
            {
                title: "Dashboard",
                icon: <FaStore />,
                path: "/vendor/dashboard",
            },
            {
                title: "Products",
                icon: <FaBoxOpen />,
                children: [
                    {
                        title: "My Products",
                        path: "/vendor/products",
                    },
                    {
                        title: "Add Product",
                        path: "/vendor/add-product",
                    },
                ],
            },
            {
                title: "Orders",
                icon: <FaShoppingBag />,
                path: "/vendor/orders",
            },
            {
                title: "Sales",
                icon: <FaChartLine />,
                path: "/vendor/sales",
            },
            {
                title: "Stock",
                icon: <FaWarehouse />,
                path: "/vendor/stock",
            },
            {
                title: "Account",
                icon: <FaUserCircle />,
                children: [
                    {
                        title: "Profile",
                        path: "/profile",
                    },
                    {
                        title: "Change Password",
                        path: "/profile/change-password",
                    },
                ],
            },
        ],
        []
    );

    const toggleMenu = (menu) => {
        setMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const isChildActive = (children = []) => {
        return children.some((child) =>
            location.pathname.startsWith(child.path)
        );
    };

    const handleLogout = () => {
        dispatch(logout());

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        toast.success("Logged out successfully");

        navigate("/login");
    };

    return (
        <>
            {/* Mobile Toggle */}

            <button
                className="btn btn-success d-lg-none position-fixed"
                style={{
                    top: 15,
                    left: 15,
                    zIndex: 1055,
                }}
                onClick={() => setMobileOpen(true)}
            >
                <FaBars />
            </button>

            {/* Overlay */}

            {mobileOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{
                        background: "rgba(0,0,0,.5)",
                        zIndex: 1040,
                    }}
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}

            <aside
                className="bg-dark text-white position-fixed vh-100 shadow"
                style={{
                    width: "270px",
                    left: mobileOpen ? 0 : undefined,
                    zIndex: 1050,
                    overflowY: "auto",
                    transition: ".3s",
                }}
            >
                {/* Header */}

                <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">

                    <div>

                        <h4 className="mb-0 fw-bold">
                            Vendor Panel
                        </h4>

                        <small className="text-light opacity-75">
                            Seller Dashboard
                        </small>

                    </div>

                    <button
                        className="btn btn-outline-light btn-sm d-lg-none"
                        onClick={() => setMobileOpen(false)}
                    >
                        <FaTimes />
                    </button>

                </div>

                {/* Navigation */}

                <nav className="mt-3">

                    <ul className="nav flex-column px-2">

                        {menuItems.map((item) => {

                            // =========================
                            // Menu With Children
                            // =========================

                            if (item.children) {

                                const menuKey = item.title.toLowerCase();

                                const expanded =
                                    menus[menuKey] || isChildActive(item.children);

                                return (

                                    <li
                                        key={item.title}
                                        className="nav-item mb-2"
                                    >

                                        <button
                                            className="
                                                btn
                                                btn-dark
                                                w-100
                                                d-flex
                                                justify-content-between
                                                align-items-center
                                                text-start
                                            "
                                            onClick={() => toggleMenu(menuKey)}
                                        >

                                            <span>

                                                <span className="me-2">
                                                    {item.icon}
                                                </span>

                                                {item.title}

                                            </span>

                                            {expanded
                                                ? <FaChevronDown />
                                                : <FaChevronRight />
                                            }

                                        </button>

                                        {expanded && (

                                            <ul
                                                className="
                                                    list-unstyled
                                                    ms-4
                                                    mt-2
                                                "
                                            >

                                                {item.children.map((child) => (

                                                    <li
                                                        key={child.path}
                                                        className="mb-1"
                                                    >

                                                        <NavLink
                                                            to={child.path}
                                                            onClick={() => setMobileOpen(false)}
                                                            className={({ isActive }) =>
                                                                `
                                                                nav-link
                                                                rounded
                                                                px-3
                                                                py-2
                                                                ${
                                                                    isActive
                                                                        ? "bg-success text-white"
                                                                        : "text-light"
                                                                }
                                                            `
                                                            }
                                                        >

                                                            {child.title}

                                                        </NavLink>

                                                    </li>

                                                ))}

                                            </ul>

                                        )}

                                    </li>

                                );

                            }

                            // =========================
                            // Normal Menu
                            // =========================

                            return (

                                <li
                                    key={item.path}
                                    className="nav-item mb-2"
                                >

                                    <NavLink
                                        to={item.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={({ isActive }) =>
                                            `
                                            nav-link
                                            rounded
                                            px-3
                                            py-3
                                            fw-semibold
                                            ${
                                                isActive
                                                    ? "bg-success text-white"
                                                    : "text-light"
                                            }
                                        `
                                        }
                                    >

                                        <span className="me-3">

                                            {item.icon}

                                        </span>

                                        {item.title}

                                    </NavLink>

                                </li>

                            );

                        })}

                    </ul>

                </nav>

                <hr className="text-secondary my-3" />

                <div className="px-3">

                    <button
                        className="
                            btn
                            btn-danger
                            w-100
                            d-flex
                            align-items-center
                            justify-content-center
                        "
                        onClick={handleLogout}
                    >

                        <FaSignOutAlt className="me-2" />

                        Logout

                    </button>

                </div>

                {/* Sidebar Footer */}

                <div
                    className="mt-auto p-3 border-top border-secondary text-center"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        background: "#212529",
                    }}
                >
                    <small className="text-light d-block opacity-75">
                        Multi Vendor E-Commerce
                    </small>

                    <small className="text-secondary">
                        Vendor Panel v1.0.0
                    </small>
                </div>

            </aside>

            {/* Responsive Styles */}

            <style>
                {`
                    @media (min-width: 992px) {
                        .vendor-content {
                            margin-left: 270px;
                        }
                    }

                    @media (max-width: 991px) {
                        aside {
                            left: -270px;
                        }
                    }

                    aside::-webkit-scrollbar {
                        width: 6px;
                    }

                    aside::-webkit-scrollbar-thumb {
                        background: #6c757d;
                        border-radius: 10px;
                    }

                    aside::-webkit-scrollbar-track {
                        background: #212529;
                    }

                    .nav-link {
                        transition: all .25s ease;
                    }

                    .nav-link:hover {
                        background: #198754 !important;
                        color: #fff !important;
                    }

                    .btn-dark:hover {
                        background: #343a40;
                    }
                `}
            </style>

        </>
    );
};

export default VendorSidebar;