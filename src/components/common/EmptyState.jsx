import React from "react";



const EmptyState = ({

    icon,

    title="No Data Found",

    description="There is nothing to display here.",

    buttonText,

    onClick

}) => {



return (


<div

className="
flex
flex-col
items-center
justify-center
text-center
py-16
px-5
"


>



{


icon &&


<div

className="
text-5xl
mb-5
"

>

{icon}

</div>


}





<h2

className="
text-xl
font-semibold
text-gray-800
mb-2
"

>

{title}

</h2>







<p

className="
text-gray-500
max-w-md
mb-6
"

>

{description}

</p>








{


buttonText &&


<button


onClick={onClick}


className="
bg-blue-600
text-white
px-5
py-2.5
rounded-lg
hover:bg-blue-700
transition
"

>


{buttonText}


</button>


}



</div>


);


};



export default EmptyState;