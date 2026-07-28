import React, { useState } from "react";



const Input = ({

    label,

    name,

    type="text",

    value,

    placeholder,

    onChange,

    onBlur,

    error,

    icon,

    disabled=false,

    required=false,

    className="",

}) => {



    const [showPassword,setShowPassword] = useState(false);




    const inputType =

    type === "password"

    ?

    (showPassword ? "text" : "password")

    :

    type;





    return (


        <div className="w-full mb-4">


            {


            label &&

            <label


            htmlFor={name}


            className="
            block
            text-sm
            font-medium
            text-gray-700
            mb-2
            "

            >


            {label}



            {


            required &&

            <span className="text-red-500">

            *

            </span>


            }



            </label>


            }




            <div

            className="
            relative
            flex
            items-center
            "

            >



            {


            icon &&


            <span

            className="
            absolute
            left-3
            text-gray-400
            "

            >

            {icon}

            </span>


            }





            <input


            id={name}


            name={name}


            type={inputType}


            value={value}


            placeholder={placeholder}


            onChange={onChange}


            onBlur={onBlur}


            disabled={disabled}


            className={

            `
            w-full
            px-4
            py-2.5
            rounded-lg
            border
            outline-none
            transition

            ${icon ? "pl-10" : ""}

            ${
            error

            ?

            "border-red-500 focus:ring-red-200"

            :

            "border-gray-300 focus:border-blue-500"

            }

            ${
            disabled

            ?

            "bg-gray-100 cursor-not-allowed"

            :

            "bg-white"

            }

            ${className}

            `

            }


            />







            {


            type==="password" &&


            <button


            type="button"


            onClick={()=>setShowPassword(!showPassword)}


            className="
            absolute
            right-3
            text-sm
            text-blue-600
            "

            >


            {


            showPassword

            ?

            "Hide"

            :

            "Show"

            }


            </button>


            }



            </div>







            {


            error &&


            <p

            className="
            text-red-500
            text-sm
            mt-1
            "

            >

            {error}

            </p>


            }



        </div>


    );


};



export default Input;