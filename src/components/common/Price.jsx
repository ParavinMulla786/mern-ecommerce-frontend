import React from "react";


const Price = ({

    price,

    oldPrice,

    currency="₹"


})=>{


return (

<div>


{


oldPrice &&


<span

className="
text-gray-400
line-through
mr-2
"

>

{currency}{oldPrice}

</span>


}




<span

className="
font-bold
text-lg
text-gray-800
"

>

{currency}{price}

</span>



</div>


);


};


export default Price;