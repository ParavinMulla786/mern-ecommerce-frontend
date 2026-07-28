import React from "react";



const ErrorMessage = ({

    message="Something went wrong!",

    onRetry,

    onClose,

}) => {



return (


<div

className="
bg-red-50
border
border-red-300
text-red-700
px-4
py-3
rounded-lg
flex
items-center
justify-between
gap-4
"


>


<div>


<p

className="
font-medium
"

>

{message}

</p>



</div>





<div

className="
flex
gap-3
"


>


{


onRetry &&


<button


onClick={onRetry}


className="
bg-red-600
text-white
px-3
py-1
rounded
hover:bg-red-700
"


>

Retry

</button>


}







{


onClose &&


<button


onClick={onClose}


className="
text-red-600
font-bold
text-xl
"


>

×

</button>


}



</div>



</div>


);


};



export default ErrorMessage;