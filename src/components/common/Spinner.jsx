import React from "react";



const Spinner = ({

    size="medium",

    color="blue"

}) => {



const sizes = {


small:

"h-4 w-4 border-2",



medium:

"h-8 w-8 border-4",



large:

"h-12 w-12 border-4"


};





const colors = {


blue:

"border-blue-600",


red:

"border-red-600",


green:

"border-green-600",


white:

"border-white"


};





return (


<span


className={

`

inline-block

rounded-full

animate-spin

border-solid

border-t-transparent

${sizes[size]}

${colors[color]}

`

}


/>


);


};



export default Spinner;