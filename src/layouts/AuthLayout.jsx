import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


/* =====================================================
   Scroll To Top
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
   Auth Layout
===================================================== */

const AuthLayout = () => {


    return (

        <>

            {/* Scroll Reset */}

            <ScrollToTop />



            {/* Auth Wrapper */}

            <div

                className="
                    min-vh-100
                    d-flex
                    align-items-center
                    justify-content-center
                    bg-light
                    py-4
                "

            >



                {/* Authentication Container */}

                <div

                    className="
                        container
                    "

                >


                    <div

                        className="
                            row
                            justify-content-center
                        "

                    >



                        <div

                            className="
                                col-12
                                col-sm-10
                                col-md-8
                                col-lg-5
                            "

                        >



                            <div

                                className="
                                    card
                                    shadow
                                    border-0
                                    rounded-4
                                "

                            >



                                <div

                                    className="
                                        card-body
                                        p-4
                                        p-md-5
                                    "

                                >


                                    {/* Login/Register/Forgot Password Pages */}

                                    <Outlet />



                                </div>


                            </div>



                        </div>


                    </div>



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

        </>

    );

};



/* =====================================================
   Export Auth Layout
===================================================== */

export default AuthLayout;