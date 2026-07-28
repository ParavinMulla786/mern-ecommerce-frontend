/* =====================================================
   TOKEN SERVICE
   JWT Token Management
===================================================== */


const TOKEN_KEY = "access_token";



/* =====================================================
   Save Token
===================================================== */

export const setToken = (token) => {

    try {

        localStorage.setItem(
            TOKEN_KEY,
            token
        );

        return true;


    } catch (error) {

        console.error(
            "Token save error:",
            error
        );

        return false;

    }

};




/* =====================================================
   Get Token
===================================================== */

export const getToken = () => {

    try {

        return localStorage.getItem(
            TOKEN_KEY
        );


    } catch (error) {

        console.error(
            "Token fetch error:",
            error
        );

        return null;

    }

};




/* =====================================================
   Remove Token
===================================================== */

export const removeToken = () => {

    try {


        localStorage.removeItem(
            TOKEN_KEY
        );


        return true;


    } catch(error){


        console.error(
            "Token remove error:",
            error
        );


        return false;

    }

};




/* =====================================================
   Check Token Exists
===================================================== */

export const hasToken = () => {


    const token = getToken();


    return Boolean(token);


};




/* =====================================================
   Decode JWT Payload
===================================================== */

export const decodeToken = () => {


    const token = getToken();



    if(!token){

        return null;

    }



    try {


        const payload =
            token.split(".")[1];



        const decoded =
            JSON.parse(
                atob(payload)
            );



        return decoded;



    } catch(error){


        console.error(
            "Token decode error:",
            error
        );


        return null;


    }


};




/* =====================================================
   Get User ID From Token
===================================================== */

export const getUserId = () => {


    const decoded =
        decodeToken();



    return (

        decoded?.id ||
        decoded?._id ||
        null

    );


};




/* =====================================================
   Get User Role From Token
===================================================== */

export const getUserRole = () => {


    const decoded =
        decodeToken();



    return (

        decoded?.role ||
        null

    );


};




/* =====================================================
   Check Token Expiry
===================================================== */

export const isTokenExpired = () => {


    const decoded =
        decodeToken();



    if(!decoded?.exp){

        return false;

    }



    const currentTime =
        Date.now() / 1000;



    return (
        decoded.exp < currentTime
    );


};




/* =====================================================
   Logout Helper
===================================================== */

export const clearAuth = () => {


    removeToken();


    localStorage.removeItem(
        "user"
    );


};