import React from "react";


const PageHeader = ({

    title,

    description,

    action,

}) => {


return (

<div

className="
flex
items-center
justify-between
mb-6
"


>


<div>


<h1

className="
text-3xl
font-bold
text-gray-800
"

>

{title}

</h1>




{

description &&


<p

className="
text-gray-500
mt-1
"

>

{description}

</p>


}


</div>





{


action &&


<div>

{action}

</div>


}



</div>


);


};



export default PageHeader;