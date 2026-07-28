/* =====================================================
   STORAGE SERVICE
   LocalStorage & SessionStorage Management
===================================================== */


/* =====================================================
   Storage Keys
===================================================== */


export const STORAGE_KEYS = {


    USER:
        "user",


    CART:
        "cart",


    WISHLIST:
        "wishlist",


    THEME:
        "theme",


    TOKEN:
        "access_token",


};





/* =====================================================
   Local Storage
===================================================== */


/*
    Save Data
*/

export const setItem = (
    key,
    value
) => {


    try {


        localStorage.setItem(

            key,

            JSON.stringify(value)

        );


        return true;


    } catch(error){


        console.error(
            "Storage save error:",
            error
        );


        return false;


    }


};





/*
    Get Data
*/

export const getItem = (
    key
) => {


    try {


        const data =
            localStorage.getItem(key);



        return data
            ? JSON.parse(data)
            : null;



    }catch(error){


        console.error(
            "Storage get error:",
            error
        );


        return null;


    }


};





/*
    Remove Data
*/

export const removeItem = (
    key
) => {


    try {


        localStorage.removeItem(
            key
        );


        return true;


    }catch(error){


        console.error(
            "Storage remove error:",
            error
        );


        return false;


    }


};






/*
    Clear Local Storage
*/

export const clearStorage = () => {


    try {


        localStorage.clear();


        return true;


    }catch(error){


        console.error(
            "Storage clear error:",
            error
        );


        return false;


    }


};






/* =====================================================
   Session Storage
===================================================== */


/*
    Save Session Data
*/

export const setSessionItem = (
    key,
    value
)=>{


    try{


        sessionStorage.setItem(

            key,

            JSON.stringify(value)

        );


        return true;


    }catch(error){


        console.error(
            "Session save error:",
            error
        );


        return false;


    }


};





/*
    Get Session Data
*/

export const getSessionItem = (
    key
)=>{


    try{


        const data =
            sessionStorage.getItem(
                key
            );



        return data
            ? JSON.parse(data)
            : null;



    }catch(error){


        console.error(
            "Session get error:",
            error
        );


        return null;


    }


};





/*
    Remove Session Data
*/

export const removeSessionItem = (
    key
)=>{


    try{


        sessionStorage.removeItem(
            key
        );


        return true;


    }catch(error){


        console.error(
            "Session remove error:",
            error
        );


        return false;


    }


};







/* =====================================================
   User Storage
===================================================== */


export const saveUser = (
    user
)=>{


    return setItem(
        STORAGE_KEYS.USER,
        user
    );


};




export const getUser = ()=>{


    return getItem(
        STORAGE_KEYS.USER
    );


};




export const removeUser = ()=>{


    return removeItem(
        STORAGE_KEYS.USER
    );


};







/* =====================================================
   Cart Storage
===================================================== */


export const saveCart = (
    cart
)=>{


    return setItem(

        STORAGE_KEYS.CART,

        cart

    );


};




export const getCart = ()=>{


    return getItem(

        STORAGE_KEYS.CART

    );


};




export const removeCart = ()=>{


    return removeItem(

        STORAGE_KEYS.CART

    );


};







/* =====================================================
   Wishlist Storage
===================================================== */


export const saveWishlist = (
    wishlist
)=>{


    return setItem(

        STORAGE_KEYS.WISHLIST,

        wishlist

    );


};




export const getWishlist = ()=>{


    return getItem(

        STORAGE_KEYS.WISHLIST

    );


};




export const removeWishlist = ()=>{


    return removeItem(

        STORAGE_KEYS.WISHLIST

    );


};







/* =====================================================
   Theme Storage
===================================================== */


export const saveTheme = (
    theme
)=>{


    return setItem(

        STORAGE_KEYS.THEME,

        theme

    );


};




export const getTheme = ()=>{


    return getItem(

        STORAGE_KEYS.THEME

    );


};




export const removeTheme = ()=>{


    return removeItem(

        STORAGE_KEYS.THEME

    );


};