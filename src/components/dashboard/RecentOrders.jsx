import React, {
    useEffect
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    useNavigate
} from "react-router-dom";


import {
    FaEye
} from "react-icons/fa";


import {
    toast
} from "react-toastify";


import {

getAllOrders,

getVendorOrders

} from "../../redux/orderSlice";



import StatusBadge from "../common/StatusBadge";


import Loader from "../common/Loader";


import EmptyState from "../common/EmptyState";


import ErrorMessage from "../common/ErrorMessage";







const RecentOrders = ({

role="admin",

limit=5

}) => {



const dispatch = useDispatch();

const navigate = useNavigate();






const {

orders,

loading,

error

}=useSelector(

(state)=>state.order

);








// ===============================
// Fetch Orders
// ===============================


useEffect(()=>{


if(role==="admin"){


dispatch(

getAllOrders({

limit

})

);


}

else{


dispatch(

getVendorOrders({

limit

})

);


}


},[dispatch,role,limit]);








useEffect(()=>{


if(error){


toast.error(error);


}


},[error]);









if(loading){


return <Loader/>;


}






if(error){


return (

<ErrorMessage

message={error}

/>

);


}







const recentOrders =

orders?.slice(0,limit) || [];









if(recentOrders.length===0){


return (

<EmptyState

title="No Recent Orders"

description="Orders will appear here"

/>

);


}








const formatDate=(date)=>{


return new Date(date)

.toLocaleDateString(

"en-IN",

{

day:"2-digit",

month:"short",

year:"numeric"

}

);


};








return (


<div

className="
card
border-0
shadow-sm
"

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
mb-3
"

>


<h5

className="
fw-bold
"

>

Recent Orders

</h5>



</div>







<div

className="
table-responsive
"

>


<table

className="
table
align-middle
table-hover
"

>


<thead

className="
table-light
"

>


<tr>


<th>

Order ID

</th>


<th>

Customer

</th>


<th>

Date

</th>


<th>

Amount

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


recentOrders.map(

(order)=>(



<tr

key={order._id}

>


<td>


#{order._id.slice(-6)}


</td>





<td>


{

order.user?.name ||

"Customer"

}


</td>






<td>


{

formatDate(order.createdAt)

}


</td>







<td>


₹ {order.totalAmount}


</td>







<td>


<StatusBadge

status={order.status}

/>


</td>







<td>


<button


className="
btn
btn-primary
btn-sm
"


onClick={()=>navigate(

`/orders/${order._id}`

)}


>


<FaEye/>


</button>


</td>




</tr>



)


)



}



</tbody>




</table>


</div>





</div>


</div>


);


};



export default RecentOrders;