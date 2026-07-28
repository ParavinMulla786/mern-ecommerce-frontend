import React from "react";


const Button = ({

    children,

    type="button",

    variant="primary",

    size="medium",

    loading=false,

    disabled=false,

    fullWidth=false,

    icon,

    onClick,

    className="",

}) => {



    const baseStyle =

    `
    flex 
    items-center 
    justify-center 
    gap-2
    rounded-lg
    font-medium
    transition-all
    duration-300
    focus:outline-none
    `;



    const variants = {


        primary:

        `
        bg-blue-600
        text-white
        hover:bg-blue-700
        `,



        secondary:

        `
        bg-gray-600
        text-white
        hover:bg-gray-700
        `,



        success:

        `
        bg-green-600
        text-white
        hover:bg-green-700
        `,



        danger:

        `
        bg-red-600
        text-white
        hover:bg-red-700
        `,



        warning:

        `
        bg-yellow-500
        text-black
        hover:bg-yellow-600
        `,



        outline:

        `
        border
        border-blue-600
        text-blue-600
        hover:bg-blue-50
        `



    };





    const sizes = {


        small:

        `
        px-3
        py-1.5
        text-sm
        `,



        medium:

        `
        px-5
        py-2.5
        text-base
        `,



        large:

        `
        px-7
        py-3
        text-lg
        `


    };




    return (


        <button


            type={type}


            disabled={disabled || loading}


            onClick={onClick}



            className={

                `
                ${baseStyle}
                ${variants[variant]}
                ${sizes[size]}
                ${fullWidth ? "w-full" : ""}
                ${
                    disabled || loading

                    ?

                    "opacity-50 cursor-not-allowed"

                    :

                    "cursor-pointer"

                }

                ${className}

                `

            }


        >


            {


            loading

            ?

            (

                <>

                <span

                className="
                animate-spin
                h-5
                w-5
                border-2
                border-white
                border-t-transparent
                rounded-full
                "
                
                >

                </span>


                Loading...


                </>


            )


            :

            (

                <>


                {

                icon && icon

                }


                {children}


                </>


            )


            }



        </button>


    );


};



export default Button;