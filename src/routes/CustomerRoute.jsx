import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../components/common/Loader";


/* =====================================================
   Customer Route Protection
===================================================== */

const CustomerRoute = () => {


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



    // Login Validation

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



    // Customer Role Check

    const isCustomer =
        user.role === "customer";

    // Unauthorized User

    if (!isCustomer) {

        return (

            <Navigate

                to="/unauthorized"

                replace

            />

        );

    }



    // Render Customer Pages

    return (

        <Outlet />

    );


};



/* =====================================================
   Export Customer Route
===================================================== */

export default CustomerRoute;