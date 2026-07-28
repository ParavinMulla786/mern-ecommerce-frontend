import React, {
    useEffect,
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    FaEye,
    FaSearch,
    FaShoppingCart
} from "react-icons/fa";


import {
    toast
} from "react-toastify";



import {
    getAllOrders,
    updateOrderStatus
} from "../../redux/orderSlice";



import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";

import Pagination from "../../components/pagination/Pagination";









const Orders = () => {


    const dispatch = useDispatch();





    const {

        orders,
        loading,
        error,
        pagination

    } = useSelector(
        state=>state.order
    );








    const [page,setPage] =
    useState(1);



    const [search,setSearch] =
    useState("");



    const [status,setStatus] =
    useState("");









    useEffect(()=>{


        dispatch(

            getAllOrders({

                page,

                search,

                status

            })

        );


    },[
        dispatch,
        page,
        search,
        status
    ]);









    const handleStatus=(id,newStatus)=>{


        dispatch(

            updateOrderStatus({

                id,

                status:newStatus

            })

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Order status updated"
            );


        })

        .catch(err=>{


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








    if(error)
    {

        return (

            <ErrorMessage

                message={error}

            />

        );

    }









    return (

<div>






<div className="mb-4">


<h1 className="fw-bold">

<FaShoppingCart/>

{" "}

Manage Orders

</h1>



<p className="text-muted">

Track and update customer orders

</p>


</div>









{/* FILTERS */}



<div className="
card
border-0
shadow-sm
mb-4
">


<div className="card-body">


<div className="row g-3">





<div className="col-md-8">


<div className="input-group">


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







<div className="col-md-4">



<select


className="form-select"


value={status}


onChange={(e)=>

setStatus(
e.target.value
)

}


>



<option value="">

All Status

</option>


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



</div>





</div>



</div>


</div>









{/* ORDERS TABLE */}



<div className="
card
border-0
shadow-sm
">


<div className="card-body">


<div className="table-responsive">



<table className="table align-middle">



<thead className="table-light">


<tr>


<th>
Order ID
</th>


<th>
Customer
</th>


<th>
Items
</th>


<th>
Amount
</th>


<th>
Status
</th>


<th>
Date
</th>


</tr>


</thead>








<tbody>



{

orders?.map(order=>(


<tr

key={
order._id
}

>



<td>


#

{
order._id.slice(-6)
}



</td>







<td>


<strong>

{

order.user?.name

||

"Customer"

}


</strong>



<br/>


<small>

{

order.user?.email

}


</small>



</td>









<td>


{

order.items?.length

||


0

}


 Products


</td>









<td>


₹

{

order.totalAmount

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



>



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


{

new Date(
order.createdAt
)
.toLocaleDateString()

}


</td>








</tr>


))


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


onPageChange={

setPage

}


/>


}







</div>

    );

};



export default Orders;