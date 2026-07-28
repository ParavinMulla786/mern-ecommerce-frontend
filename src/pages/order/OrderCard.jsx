import React from "react";


import {
    useDispatch
} from "react-redux";


import {
    useNavigate
} from "react-router-dom";


import {
    FaBox,
    FaEye,
    FaTimesCircle
} from "react-icons/fa";


import {
    toast
} from "react-toastify";


import {
    cancelOrder
} from "../../redux/orderSlice";









const OrderCard = ({
    order
}) => {


    const dispatch = useDispatch();

    const navigate = useNavigate();









    const getStatusClass=(status)=>{


        switch(status)
        {

            case "pending":

                return "bg-warning text-dark";


            case "confirmed":

                return "bg-info text-dark";


            case "processing":

                return "bg-primary";


            case "shipped":

                return "bg-secondary";


            case "delivered":

                return "bg-success";


            case "cancelled":

                return "bg-danger";


            default:

                return "bg-dark";

        }


    };









    const handleCancel=()=>{


        if(
            !window.confirm(
                "Cancel this order?"
            )
        )
        {

            return;

        }







        dispatch(

            cancelOrder(
                order._id
            )

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Order cancelled"
            );


        })

        .catch((err)=>{


            toast.error(

                err ||

                "Unable to cancel order"

            );


        });



    };









    return (

<div className="
card
border-0
shadow-sm
mb-4
">


<div className="card-body">



<div className="
d-flex
justify-content-between
align-items-center
mb-3
">


<div>


<h5 className="fw-bold">


<FaBox/>

{" "}

Order #

{

order._id.slice(-6)

}


</h5>



<p className="text-muted mb-0">


{

new Date(
order.createdAt
)
.toLocaleDateString()

}


</p>


</div>







<span className={

`
badge
${getStatusClass(
order.orderStatus
)}
`

}>


{

order.orderStatus

}


</span>





</div>









<hr/>









{/* PRODUCTS */}



<h6 className="fw-bold">

Products

</h6>






{

order.items?.map(item=>(


<div

key={item._id}

className="
d-flex
justify-content-between
align-items-center
mb-2
"


>


<div>


<strong>

{

item.product?.name

}


</strong>



<br/>


<small className="text-muted">


Quantity:

{

item.quantity

}


</small>


</div>







<strong>

₹

{

item.price *

item.quantity

||

item.product?.price *

item.quantity

}


</strong>





</div>


))


}









<hr/>









<div className="
row
mb-3
">



<div className="col-md-6">


<strong>

Payment:

</strong>


{" "}


{

order.paymentMethod

}



</div>







<div className="col-md-6">


<strong>

Total:

</strong>


₹

{

order.totalAmount

}



</div>



</div>









<div className="
d-flex
gap-2
">


<button


className="
btn
btn-primary
btn-sm
"


onClick={()=>


navigate(

`/orders/${order._id}`

)


}


>


<FaEye/>

{" "}

View Details


</button>









{

order.orderStatus==="pending"

&&


<button


className="
btn
btn-danger
btn-sm
"


onClick={handleCancel}


>


<FaTimesCircle/>

{" "}

Cancel


</button>


}







</div>







</div>


</div>

    );

};



export default OrderCard;
