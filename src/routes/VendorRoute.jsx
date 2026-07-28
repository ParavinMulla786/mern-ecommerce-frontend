import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../components/common/Loader";


/* =====================================================
   Vendor Route Protection
===================================================== */

const VendorRoute = () => {


    const location = useLocation();



    // Auth State

    const {

        user,
        token,
        loading,
        isAuthenticated

    } = useSelector(
        (state) => state.auth
    );



    // Loading while checking user

    if (loading) {

        return (

            <Loader />

        );

    }



    // Login Check

    if (

        !isAuthenticated ||
        !user ||
        !token

    ) {


        return (

            <Navigate

                to="/login"

                replace

                state={{
                    from: location
                }}

            />

        );

    }



    // Vendor Role Check

    const isVendor =
        user.role === "vendor";

    // Unauthorized User

    if (!isVendor) {

        return (

            <Navigate

                to="/unauthorized"

                replace

            />

        );

    }



    // Render Vendor Pages

    return (

        <Outlet />

    );


};



/* =====================================================
   Export Vendor Route
===================================================== */

export default VendorRoute;