/* =====================================================
   HELPER FUNCTIONS
===================================================== */





/* =====================================================
   Currency Formatter
===================================================== */


export const formatCurrency = (

    amount,

    currency = "INR"

) => {


    if(
        amount === null ||
        amount === undefined
    ){

        return "₹0";

    }



    return new Intl.NumberFormat(

        "en-IN",

        {

            style:
                "currency",


            currency,


            maximumFractionDigits:
                0,

        }

    ).format(amount);


};









/* =====================================================
   Number Formatter
===================================================== */


export const formatNumber = (

    number

) => {


    if(!number){

        return "0";

    }



    return new Intl.NumberFormat(

        "en-IN"

    ).format(number);


};









/* =====================================================
   Capitalize First Letter
===================================================== */


export const capitalize = (

    text

) => {


    if(!text){

        return "";

    }



    return (

        text.charAt(0)
            .toUpperCase()

        +

        text.slice(1)

    );


};









/* =====================================================
   Convert Text To Title Case
===================================================== */


export const titleCase = (

    text

) => {


    if(!text){

        return "";

    }



    return text

        .split(" ")

        .map(

            word =>
                capitalize(word)

        )

        .join(" ");


};









/* =====================================================
   Create Slug
===================================================== */


export const createSlug = (

    text

) => {


    if(!text){

        return "";

    }



    return text

        .toLowerCase()

        .trim()

        .replace(

            /[^a-z0-9]+/g,

            "-"

        )

        .replace(

            /^-+|-+$/g,

            ""

        );


};









/* =====================================================
   Truncate Text
===================================================== */


export const truncateText = (

    text,

    length = 50

) => {


    if(
        !text ||
        text.length <= length
    ){

        return text;

    }



    return (

        text.substring(
            0,
            length
        )

        +

        "..."

    );


};









/* =====================================================
   File Size Formatter
===================================================== */


export const formatFileSize = (

    bytes

) => {


    if(
        bytes === 0
    ){

        return "0 Bytes";

    }



    const sizes = [

        "Bytes",

        "KB",

        "MB",

        "GB"

    ];



    const index =

        Math.floor(

            Math.log(bytes)

            /

            Math.log(1024)

        );



    return (

        Math.round(

            bytes /

            Math.pow(

                1024,

                index

            )

        )

        +

        " "

        +

        sizes[index]

    );


};









/* =====================================================
   Get Image Preview
===================================================== */


export const getImagePreview = (

    file

) => {


    return new Promise(

        (resolve)=>{


            const reader =
                new FileReader();



            reader.onload = () => {


                resolve(

                    reader.result

                );


            };



            reader.readAsDataURL(file);


        }

    );


};









/* =====================================================
   Check Empty Object
===================================================== */


export const isEmptyObject = (

    object

) => {


    return (

        !object ||

        Object.keys(object)
            .length === 0

    );


};









/* =====================================================
   Remove Empty Values
===================================================== */


export const removeEmptyValues = (

    object

) => {


    return Object.fromEntries(

        Object.entries(object)

            .filter(

                ([_, value]) =>

                    value !== "" &&

                    value !== null &&

                    value !== undefined

            )

    );


};









/* =====================================================
   Array Chunk
===================================================== */


export const chunkArray = (

    array,

    size

) => {


    const result = [];



    for(

        let i = 0;

        i < array.length;

        i += size

    ){


        result.push(

            array.slice(

                i,

                i + size

            )

        );


    }



    return result;


};









/* =====================================================
   Build Query Params
===================================================== */


export const buildQueryParams = (

    params

) => {


    const query =

        new URLSearchParams();



    Object.entries(params)

        .forEach(

            ([key,value])=>{


                if(

                    value !== undefined &&

                    value !== null &&

                    value !== ""

                ){

                    query.append(

                        key,

                        value

                    );

                }


            }

        );



    return query.toString();


};









/* =====================================================
   API Error Message
===================================================== */


export const getErrorMessage = (

    error

) => {


    return (

        error?.response?.data?.message

        ||

        error?.message

        ||

        "Something went wrong"

    );


};









/* =====================================================
   Delay Function
===================================================== */


export const delay = (

    milliseconds

) => {


    return new Promise(

        resolve =>

            setTimeout(

                resolve,

                milliseconds

            )

    );


};
