/* =====================================================
   NOTIFICATION SERVICE
   React Toastify Wrapper
===================================================== */


import { toast } from "react-toastify";





/* =====================================================
   Default Configuration
===================================================== */


const toastConfig = {


    position:
        "top-right",


    autoClose:
        3000,


    hideProgressBar:
        false,


    closeOnClick:
        true,


    pauseOnHover:
        true,


    draggable:
        true,


};







/* =====================================================
   Success Notification
===================================================== */


export const showSuccess = (
    message
)=>{


    toast.success(

        message,

        toastConfig

    );


};








/* =====================================================
   Error Notification
===================================================== */


export const showError = (
    message
)=>{


    toast.error(

        message,

        toastConfig

    );


};








/* =====================================================
   Warning Notification
===================================================== */


export const showWarning = (
    message
)=>{


    toast.warning(

        message,

        toastConfig

    );


};








/* =====================================================
   Info Notification
===================================================== */


export const showInfo = (
    message
)=>{


    toast.info(

        message,

        toastConfig

    );


};








/* =====================================================
   Loading Notification
===================================================== */


export const showLoading = (
    message
)=>{


    return toast.loading(

        message

    );


};







/* =====================================================
   Update Loading Toast
===================================================== */


export const updateLoading = (

    toastId,

    message,

    type="success"

)=>{


    toast.update(

        toastId,

        {

            render:
                message,


            type,


            isLoading:
                false,


            autoClose:
                3000,


            closeOnClick:
                true,


        }

    );


};







/* =====================================================
   Dismiss Toast
===================================================== */


export const dismissToast = (
    toastId
)=>{


    toast.dismiss(

        toastId

    );


};








/* =====================================================
   API Error Handler
===================================================== */


export const handleApiError = (

    error

)=>{


    let message =
        "Something went wrong";



    if(
        error?.response?.data?.message
    ){


        message =
            error.response.data.message;


    }



    else if(
        error?.message
    ){


        message =
            error.message;


    }



    showError(
        message
    );



    return message;

};








/* =====================================================
   Promise Toast
===================================================== */


export const showPromise = (

    promise,

    messages

)=>{


    return toast.promise(

        promise,


        {


            pending:
                messages.pending || 
                "Loading...",



            success:
                messages.success || 
                "Success",



            error:
                messages.error || 
                "Failed",


        },


        toastConfig

    );


};