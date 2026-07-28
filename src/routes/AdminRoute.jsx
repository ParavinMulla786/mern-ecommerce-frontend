import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../components/common/Loader";


/* =====================================================
   Admin Route Protection
===================================================== */

const AdminRoute = () => {


    const location = useLocation();



    // Authentication State

    const {

        user,
        token,
        loading,
        isAuthenticated

    } = useSelector(
        (state) => state.auth
    );



    // Loading State

    if (loading) {

        return (

            <Loader />

        );

    }



    // Check Login

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



    // Role Check

    const isAdmin =
        user.role === "admin";

    // Unauthorized User

    if (!isAdmin) {

        return (

            <Navigate

                to="/unauthorized"

                replace

            />

        );

    }



    // Render Admin Pages

    return (

        <Outlet />

    );


};



/* =====================================================
   Export Admin Route
===================================================== */

export default AdminRoute;