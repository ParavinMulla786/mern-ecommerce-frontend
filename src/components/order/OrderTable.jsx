import React, {
    useEffect,
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    useNavigate
} from "react-router-dom";


import {
    FaEye,
    FaSearch,
    FaEdit
} from "react-icons/fa";


import {
    toast
} from "react-toastify";


import {
    getAllOrders,
    updateOrderStatus
} from "../../redux/orderSlice";


import Loader from "../common/Loader";

import Pagination from "../pagination/Pagination";









const OrderTable = ({
    role="admin"
}) => {


    const dispatch = useDispatch();

    const navigate = useNavigate();







    const {

        orders,
        loading,
        pagination

    } = useSelector(
        state=>state.order
    );









    const [
        search,
        setSearch
    ] = useState("");



    const [
        page,
        setPage
    ] = useState(1);









    useEffect(()=>{


        dispatch(

            getAllOrders({

                page,

                search,

                role

            })

        );


    },[
        dispatch,
        page,
        search,
        role
    ]);









    const handleStatus=(id,status)=>{


        dispatch(

            updateOrderStatus({

                id,

                status

            })

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Order status updated"
            );


        })

        .catch((err)=>{


            toast.error(

                err ||

                "Update failed"

            );


        });



    };









    if(loading)
    {

        return <Loader/>;

    }









    return (

<div>







<div className="
card
border-0
shadow-sm
mb-4
">


<div className="card-body">



<div className="
input-group
">


<span className="input-group-text">

<FaSearch/>

</span>



<input


className="form-control"


placeholder="Search order..."


value={search}


onChange={(e)=>

setSearch(
e.target.value
)

}


/>



</div>



</div>


</div>









<div className="
card
border-0
shadow-sm
">


<div className="card-body">



<div className="
table-responsive
">



<table className="
table
align-middle
">


<thead className="table-light">


<tr>


<th>

Order ID

</th>


<th>

Customer

</th>


<th>

Amount

</th>


<th>

Payment

</th>


<th>

Status

</th>


<th>

Action

</th>


</tr>


</thead>







<tbody>



{

orders?.length > 0

?


orders.map(order=>(



<tr

key={order._id}

>



<td>


#

{

order._id.slice(-6)

}


</td>









<td>


{

order.user?.name ||

"Customer"

}



</td>









<td>


₹

{

order.totalAmount

}


</td>









<td>


{

order.paymentMethod

}


</td>









<td>


<select


className="
form-select
form-select-sm
"


value={
order.orderStatus
}


onChange={(e)=>

handleStatus(

order._id,

e.target.value

)

}


/>



<option value="pending">

Pending

</option>



<option value="confirmed">

Confirmed

</option>



<option value="processing">

Processing

</option>



<option value="shipped">

Shipped

</option>



<option value="delivered">

Delivered

</option>



<option value="cancelled">

Cancelled

</option>



</select>


</td>









<td>


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

View


</button>


</td>







</tr>


))



:


<tr>

<td

colSpan="6"

className="text-center text-muted"

>

No orders found

</td>

</tr>



}



</tbody>



</table>




</div>


</div>


</div>









{

pagination &&


<Pagination


currentPage={page}


totalPages={
pagination.totalPages
}


onPageChange={setPage}


/>


}



</div>

    );

};



export default OrderTable;