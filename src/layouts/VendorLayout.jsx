import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import VendorNavbar from "../components/navbar/VendorNavbar";
import VendorSidebar from "../components/sidebar/VendorSidebar";

import "react-toastify/dist/ReactToastify.css";


/* =====================================================
   Scroll To Top Component
===================================================== */

const ScrollToTop = () => {

    const { pathname } = useLocation();


    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

    }, [pathname]);


    return null;

};



/* =====================================================
   Vendor Layout Component
===================================================== */

const VendorLayout = () => {


    // Sidebar State

    const [sidebarOpen, setSidebarOpen] =
        useState(false);



    // Open / Close Sidebar

    const toggleSidebar = () => {

        setSidebarOpen((prev) => !prev);

    };



    // Close Sidebar

    const closeSidebar = () => {

        setSidebarOpen(false);

    };



    return (

        <>

            {/* Scroll Reset */}

            <ScrollToTop />



            {/* Main Vendor Wrapper */}

            <div

                className="
                    d-flex
                    min-vh-100
                    bg-light
                "

            >



                {/* ==========================
                    Vendor Sidebar
                ========================== */}

                <VendorSidebar

                    sidebarOpen={sidebarOpen}

                    onClose={closeSidebar}

                />



                {/* ==========================
                    Content Section
                ========================== */}

                <div

                    className="
                        flex-grow-1
                        d-flex
                        flex-column
                    "

                >



                    {/* Vendor Navbar */}

                    <VendorNavbar

                        onToggleSidebar={
                            toggleSidebar
                        }

                    />



                    {/* Dynamic Pages */}

                    <main

                        className="
                            flex-grow-1
                            p-3
                            p-md-4
                        "

                    >

                        <Outlet />

                    </main>



                </div>



            </div>



            {/* Toast Notifications */}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />

            {/* =====================================
                Mobile Sidebar Overlay
            ===================================== */}

            {sidebarOpen && (

                <div
                    className="
                        d-lg-none
                        position-fixed
                        top-0
                        start-0
                        w-100
                        h-100
                        bg-dark
                        opacity-50
                    "
                    style={{
                        zIndex: 1020,
                    }}
                    onClick={closeSidebar}
                />

            )}


        </>

    );

};



/* =====================================
   Export Vendor Layout
===================================== */

export default VendorLayout;