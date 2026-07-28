/* =====================================================
   VALIDATION UTILITIES
===================================================== */



/* =====================================================
   Required Field
===================================================== */


export const required = (

    value,

    fieldName = "Field"

) => {


    if(

        !value ||

        value.toString().trim() === ""

    ){

        return `${fieldName} is required`;

    }


    return null;


};







/* =====================================================
   Email Validation
===================================================== */


export const validateEmail = (

    email

) => {


    const regex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    if(!email){

        return "Email is required";

    }



    if(

        !regex.test(email)

    ){

        return "Invalid email address";

    }



    return null;


};







/* =====================================================
   Password Validation
===================================================== */


export const validatePassword = (

    password

) => {


    if(!password){

        return "Password is required";

    }



    if(

        password.length < 6

    ){

        return "Password must contain minimum 6 characters";

    }



    return null;


};







/* =====================================================
   Strong Password
===================================================== */


export const validateStrongPassword = (

    password

) => {


    const regex =

        /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;



    if(

        !regex.test(password)

    ){

        return (

            "Password must contain 8 characters, " +

            "letters and numbers"

        );

    }



    return null;


};







/* =====================================================
   Phone Validation
===================================================== */


export const validatePhone = (

    phone

) => {


    const regex =

        /^[0-9]{10}$/;



    if(!phone){

        return "Phone number is required";

    }



    if(

        !regex.test(phone)

    ){

        return "Invalid phone number";

    }



    return null;


};







/* =====================================================
   Confirm Password
===================================================== */


export const validateConfirmPassword = (

    password,

    confirmPassword

) => {


    if(

        password !== confirmPassword

    ){

        return "Passwords do not match";

    }



    return null;


};







/* =====================================================
   Login Form Validation
===================================================== */


export const validateLogin = (

    data

) => {


    const errors = {};



    const emailError =

        validateEmail(

            data.email

        );



    const passwordError =

        validatePassword(

            data.password

        );



    if(emailError){

        errors.email = emailError;

    }



    if(passwordError){

        errors.password = passwordError;

    }



    return errors;


};







/* =====================================================
   Register Form Validation
===================================================== */


export const validateRegister = (

    data

) => {


    const errors = {};



    if(

        !data.name

    ){

        errors.name =
            "Name is required";

    }



    const emailError =

        validateEmail(

            data.email

        );



    const passwordError =

        validatePassword(

            data.password

        );



    if(emailError){

        errors.email = emailError;

    }



    if(passwordError){

        errors.password = passwordError;

    }



    if(

        data.password !==

        data.confirmPassword

    ){

        errors.confirmPassword =

            "Passwords do not match";

    }



    return errors;


};







/* =====================================================
   Product Form Validation
===================================================== */


export const validateProduct = (

    data

) => {


    const errors = {};



    if(

        !data.name

    ){

        errors.name =
            "Product name is required";

    }



    if(

        !data.category

    ){

        errors.category =
            "Category is required";

    }



    if(

        !data.price ||

        data.price <= 0

    ){

        errors.price =
            "Valid price is required";

    }



    if(

        !data.stock ||

        data.stock < 0

    ){

        errors.stock =
            "Valid stock is required";

    }



    return errors;


};







/* =====================================================
   Image Validation
===================================================== */


export const validateImage = (

    file

) => {


    const allowedTypes = [


        "image/jpeg",

        "image/png",

        "image/webp"


    ];



    const maxSize =

        5 *

        1024 *

        1024;





    if(!file){

        return "Image is required";

    }





    if(

        !allowedTypes.includes(

            file.type

        )

    ){

        return "Only JPG, PNG and WEBP allowed";

    }





    if(

        file.size >

        maxSize

    ){

        return "Image size should be less than 5MB";

    }



    return null;


};







/* =====================================================
   Checkout Validation
===================================================== */


export const validateCheckout = (

    data

) => {


    const errors = {};



    if(

        !data.address

    ){

        errors.address =
            "Address is required";

    }



    if(

        !data.city

    ){

        errors.city =
            "City is required";

    }



    if(

        !data.pincode

    ){

        errors.pincode =
            "Pincode is required";

    }



    return errors;


};







/* =====================================================
   Check Validation Success
===================================================== */


export const isValid = (

    errors

) => {


    return (

        Object.keys(errors)

            .length === 0

    );


};