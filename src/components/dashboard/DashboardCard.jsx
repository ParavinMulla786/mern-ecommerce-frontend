import React from "react";


const DashboardCard = ({

    title,

    value,

    icon,

    bgClass="primary",

    description,

    trend,

    trendType="success"

}) => {



return (


<div

className="
col-12
col-sm-6
col-lg-3
mb-4
"

>


<div

className={

`card
border-0
shadow-sm
h-100
bg-${bgClass}
text-white`

}

>


<div

className="
card-body
"

>


<div

className="
d-flex
justify-content-between
align-items-center
"

>



<div>


<h6

className="
mb-2
opacity-75
"

>

{title}

</h6>



<h2

className="
fw-bold
mb-0
"

>

{value ?? 0}

</h2>



{

description &&

(

<p

className="
small
mb-0
mt-2
opacity-75
"

>

{description}

</p>

)

}



</div>









<div

className="
fs-1
opacity-75
"

>


{icon}


</div>





</div>










{

trend &&

(

<div

className="mt-3"

>


<span

className={

`badge

bg-${trendType}

`

}

>

{trend}

</span>



</div>

)

}



</div>


</div>


</div>


);


};



export default DashboardCard;