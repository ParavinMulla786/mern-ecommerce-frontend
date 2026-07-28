/* =====================================================
   USE AUTH HOOK
   Authentication Helper Hook
===================================================== */


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    logout
} from "../redux/authSlice";


import {
    clearAuth
} from "../services/tokenService";



const useAuth = () => {


    const dispatch = useDispatch();



    // Auth Redux State

    const {

        user,
        token,
        loading,
        isAuthenticated

    } = useSelector(
        (state) => state.auth
    );







    /* =====================================================
       Check Login Status
    ===================================================== */


    const isLoggedIn =
        Boolean(
            isAuthenticated &&
            user &&
            token
        );







    /* =====================================================
       User Role
    ===================================================== */


    const role =
        user?.role || null;







    /* =====================================================
       Role Checks
    ===================================================== */


    const isAdmin = () => {


        return role === "admin";


    };




    const isVendor = () => {


        return role === "vendor";


    };




    const isCustomer = () => {


        return role === "customer";


    };








    /* =====================================================
       Permission Check
    ===================================================== */


    const hasRole = (
        requiredRole
    ) => {


        if(
            !role
        ){

            return false;

        }


        return role === requiredRole;


    };








    /* =====================================================
       Logout
    ===================================================== */


    const logout = async () => {


        try {


            clearAuth();


            dispatch(
                logout()
            );


        }

        catch(error){


            console.error(
                "Logout error:",
                error
            );


        }


    };







    /* =====================================================
       Return Values
    ===================================================== */


    return {


        user,


        token,


        role,


        loading,


        isAuthenticated:
            isLoggedIn,


        isAdmin,


        isVendor,


        isCustomer,


        hasRole,


        logout,


    };


};



export default useAuth;