import React, { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    FaTachometerAlt,
    FaUsers,
    FaStore,
    FaBoxes,
    FaTags,
    FaLayerGroup,
    FaShoppingCart,
    FaStar,
    FaChartBar,
    FaCog,
    FaChevronDown,
    FaChevronRight,
    FaBars,
    FaTimes,
    FaSignOutAlt
} from "react-icons/fa";

import { toast } from "react-toastify";

import { logout } from "../../redux/authSlice";

const AdminSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const [openMenus, setOpenMenus] = useState({
        products: false,
        reports: false,
        settings: false,
    });

    const menuItems = useMemo(
        () => [
            {
                title: "Dashboard",
                icon: <FaTachometerAlt />,
                path: "/admin/dashboard",
            },
            {
                title: "Users",
                icon: <FaUsers />,
                path: "/admin/users",
            },
            {
                title: "Vendors",
                icon: <FaStore />,
                path: "/admin/vendors",
            },
            {
                title: "Products",
                icon: <FaBoxes />,
                children: [
                    {
                        title: "All Products",
                        path: "/admin/products",
                    },
                    {
                        title: "Brands",
                        path: "/admin/brands",
                    },
                    {
                        title: "Categories",
                        path: "/admin/categories",
                    },
                ],
            },
            {
                title: "Orders",
                icon: <FaShoppingCart />,
                path: "/admin/orders",
            },
            {
                title: "Reviews",
                icon: <FaStar />,
                path: "/admin/reviews",
            },
            {
                title: "Reports",
                icon: <FaChartBar />,
                children: [
                    {
                        title: "Sales Report",
                        path: "/admin/reports/sales",
                    },
                    {
                        title: "Revenue Report",
                        path: "/admin/reports/revenue",
                    },
                ],
            },
            {
                title: "Settings",
                icon: <FaCog />,
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
        setOpenMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const closeMobileSidebar = () => {
        setIsMobileOpen(false);
    };

    const openMobileSidebar = () => {
        setIsMobileOpen(true);
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
                className="btn btn-primary d-lg-none position-fixed"
                style={{
                    top: "15px",
                    left: "15px",
                    zIndex: 1055,
                }}
                onClick={openMobileSidebar}
            >
                <FaBars />
            </button>

            {/* Overlay */}

            {isMobileOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{
                        background: "rgba(0,0,0,.5)",
                        zIndex: 1040,
                    }}
                    onClick={closeMobileSidebar}
                />
            )}

            {/* Sidebar */}

            <aside
                className={`
                    bg-dark
                    text-white
                    vh-100
                    position-fixed
                    shadow
                    ${isMobileOpen ? "start-0" : "start-lg-0 start-n100"}
                `}
                style={{
                    width: "270px",
                    top: 0,
                    left: isMobileOpen ? 0 : undefined,
                    zIndex: 1050,
                    transition: "all .3s ease",
                    overflowY: "auto",
                }}
            >
                {/* Header */}

                <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-secondary">

                    <div>

                        <h4 className="fw-bold mb-0">
                            Admin Panel
                        </h4>

                        <small className="text-light opacity-75">
                            Multi Vendor Store
                        </small>

                    </div>

                    <button
                        className="btn btn-sm btn-outline-light d-lg-none"
                        onClick={closeMobileSidebar}
                    >
                        <FaTimes />
                    </button>

                </div>

                {/* Navigation */}

                <nav className="mt-3">

                    <ul className="nav flex-column px-2">

                        {menuItems.map((item) => {

                            // ==========================
                            // Menu With Children
                            // ==========================

                            if (item.children) {

                                const menuKey = item.title.toLowerCase();

                                const expanded =
                                    openMenus[menuKey] || isChildActive(item.children);

                                return (

                                    <li
                                        className="nav-item mb-2"
                                        key={item.title}
                                    >

                                        <button
                                            className="
                                                btn
                                                btn-dark
                                                w-100
                                                text-start
                                                d-flex
                                                justify-content-between
                                                align-items-center
                                            "
                                            onClick={() => toggleMenu(menuKey)}
                                        >

                                            <span>

                                                <span className="me-2">
                                                    {item.icon}
                                                </span>

                                                {item.title}

                                            </span>

                                            {expanded ? (
                                                <FaChevronDown />
                                            ) : (
                                                <FaChevronRight />
                                            )}

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
                                                            onClick={closeMobileSidebar}
                                                            className={({ isActive }) =>
                                                                `
                                                                nav-link
                                                                rounded
                                                                px-3
                                                                py-2
                                                                ${
                                                                    isActive
                                                                        ? "bg-primary text-white"
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

                            // ==========================
                            // Normal Menu
                            // ==========================

                            return (

                                <li
                                    key={item.path}
                                    className="nav-item mb-2"
                                >

                                    <NavLink
                                        to={item.path}
                                        onClick={closeMobileSidebar}
                                        className={({ isActive }) =>
                                            `
                                            nav-link
                                            rounded
                                            px-3
                                            py-3
                                            fw-semibold
                                            ${
                                                isActive
                                                    ? "bg-primary text-white"
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
                    <small className="text-light opacity-75 d-block">
                        Multi Vendor E-Commerce
                    </small>

                    <small className="text-secondary">
                        Admin Panel v1.0.0
                    </small>
                </div>

            </aside>

            {/* Desktop Content Spacing */}

            <style>
                {`
                    @media (min-width:992px){

                        .admin-content{
                            margin-left:270px;
                        }

                    }

                    @media (max-width:991px){

                        aside{
                            left:-270px;
                        }

                    }

                    aside::-webkit-scrollbar{
                        width:6px;
                    }

                    aside::-webkit-scrollbar-thumb{
                        background:#6c757d;
                        border-radius:10px;
                    }

                    aside::-webkit-scrollbar-track{
                        background:#212529;
                    }

                    .nav-link{

                        transition:all .25s ease;

                    }

                    .nav-link:hover{

                        background:#0d6efd;
                        color:#fff !important;

                    }

                    .btn-dark:hover{

                        background:#343a40;

                    }
                `}
            </style>

        </>
    );
};

export default AdminSidebar;