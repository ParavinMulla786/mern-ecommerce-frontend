import React from "react";


import {
    FaClock,
    FaCheck,
    FaCog,
    FaTruck,
    FaBoxOpen,
    FaTimesCircle
} from "react-icons/fa";









const OrderStatus = ({
    status
}) => {



    const statuses=[


        {
            name:"pending",
            label:"Pending",
            icon:<FaClock/>
        },


        {
            name:"confirmed",
            label:"Confirmed",
            icon:<FaCheck/>
        },


        {
            name:"processing",
            label:"Processing",
            icon:<FaCog/>
        },


        {
            name:"shipped",
            label:"Shipped",
            icon:<FaTruck/>
        },


        {
            name:"delivered",
            label:"Delivered",
            icon:<FaBoxOpen/>
        }


    ];








    const currentIndex =

    statuses.findIndex(

        item=>

        item.name===status

    );









    if(
        status==="cancelled"
    )
    {

        return (

<div className="
card
border-danger
shadow-sm
">


<div className="
card-body
text-danger
text-center
">


<h5>


<FaTimesCircle/>

{" "}

Order Cancelled


</h5>


<p className="mb-0">

This order has been cancelled.

</p>


</div>


</div>

        );

    }









    return (

<div className="
card
border-0
shadow-sm
">


<div className="card-body">



<h5 className="fw-bold mb-4">

Order Status

</h5>









<div className="
d-flex
justify-content-between
position-relative
">


{

statuses.map(

(item,index)=>(


<div

key={item.name}

className="
text-center
flex-fill
"

>


<div


className={


`
rounded-circle
mx-auto
mb-2
d-flex
align-items-center
justify-content-center
${

index <= currentIndex

?

"bg-primary text-white"

:

"bg-light text-secondary"

}

`

}


style={{

width:"45px",

height:"45px"

}}


>


{

item.icon

}


</div>







<small


className={

index <= currentIndex

?

"fw-bold"

:

"text-muted"

}


>


{

item.label

}


</small>





</div>


))


}



</div>








</div>


</div>

    );

};



export default OrderStatus;