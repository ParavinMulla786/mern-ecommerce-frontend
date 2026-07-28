import React, {
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
    toast
} from "react-toastify";


import {
    FaCreditCard,
    FaMoneyBillWave
} from "react-icons/fa";


import {
    createOrder
} from "../../redux/orderSlice";


import {
    clearCart
} from "../../redux/cartSlice";







const CheckoutForm = () => {


const dispatch = useDispatch();

const navigate = useNavigate();





const {

    cartItems,

    totalAmount

}=useSelector(

(state)=>state.cart

);







const {

    loading

}=useSelector(

(state)=>state.order

);








const [formData,setFormData]=useState({

    fullName:"",

    phone:"",

    address:"",

    city:"",

    state:"",

    pincode:"",

    paymentMethod:"COD"

});









// ============================
// Input Handler
// ============================


const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};









// ============================
// Submit Order
// ============================


const handleSubmit=(e)=>{


e.preventDefault();






if(!cartItems || cartItems.length===0){


toast.error(

"Cart is empty"

);


return;


}







if(

!formData.fullName ||

!formData.phone ||

!formData.address ||

!formData.city ||

!formData.pincode

){


toast.warning(

"Please fill all required fields"

);


return;


}







const orderData={


shippingAddress:{

    fullName:formData.fullName,

    phone:formData.phone,

    address:formData.address,

    city:formData.city,

    state:formData.state,

    pincode:formData.pincode

},


paymentMethod:

formData.paymentMethod,


items:cartItems.map(item=>({

product:item.product._id,

quantity:item.quantity

})),


totalAmount


};







dispatch(createOrder(orderData))

.then((result)=>{


if(result.meta.requestStatus==="fulfilled"){


toast.success(

"Order placed successfully"

);



dispatch(clearCart());



navigate("/orders");


}



});


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


<h3

className="
fw-bold
mb-4
"

>

Checkout

</h3>






<form onSubmit={handleSubmit}>




<div className="row">



<div className="col-md-6 mb-3">


<label className="form-label">

Full Name

</label>


<input


type="text"


name="fullName"


className="form-control"


value={formData.fullName}


onChange={handleChange}


/>


</div>






<div className="col-md-6 mb-3">


<label className="form-label">

Phone Number

</label>


<input


type="text"


name="phone"


className="form-control"


value={formData.phone}


onChange={handleChange}


/>


</div>





</div>









<div className="mb-3">


<label className="form-label">

Address

</label>


<textarea


name="address"


className="form-control"


rows="3"


value={formData.address}


onChange={handleChange}


/>


</div>








<div className="row">


<div className="col-md-4 mb-3">


<label className="form-label">

City

</label>


<input


name="city"


className="form-control"


value={formData.city}


onChange={handleChange}


/>


</div>






<div className="col-md-4 mb-3">


<label className="form-label">

State

</label>


<input


name="state"


className="form-control"


value={formData.state}


onChange={handleChange}


/>


</div>






<div className="col-md-4 mb-3">


<label className="form-label">

Pincode

</label>


<input


name="pincode"


className="form-control"


value={formData.pincode}


onChange={handleChange}


/>


</div>


</div>









<h5 className="mt-3">

Payment Method

</h5>





<div className="form-check">


<input


className="form-check-input"


type="radio"


name="paymentMethod"


value="COD"


checked={formData.paymentMethod==="COD"}


onChange={handleChange}


/>


<label className="form-check-label">


<FaMoneyBillWave/>

 Cash On Delivery


</label>


</div>







<div className="form-check mb-4">


<input


className="form-check-input"


type="radio"


name="paymentMethod"


value="ONLINE"


checked={formData.paymentMethod==="ONLINE"}


onChange={handleChange}


/>


<label className="form-check-label">


<FaCreditCard/>

 Online Payment


</label>


</div>







<button


className="
btn
btn-primary
w-100
"


disabled={loading}


>


{

loading

?

"Placing Order..."

:

`Place Order ₹${totalAmount}`

}


</button>





</form>




</div>


</div>


);


};



export default CheckoutForm;import React, {
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
    toast
} from "react-toastify";


import {
    FaCreditCard,
    FaMoneyBillWave
} from "react-icons/fa";


import {
    createOrder
} from "../../redux/orderSlice";


import {
    clearCart
} from "../../redux/cartSlice";







const CheckoutForm = () => {


const dispatch = useDispatch();

const navigate = useNavigate();





const {

    cartItems,

    totalAmount

}=useSelector(

(state)=>state.cart

);







const {

    loading

}=useSelector(

(state)=>state.order

);








const [formData,setFormData]=useState({

    fullName:"",

    phone:"",

    address:"",

    city:"",

    state:"",

    pincode:"",

    paymentMethod:"COD"

});









// ============================
// Input Handler
// ============================


const handleChange=(e)=>{


setFormData({

...formData,

[e.target.name]:e.target.value

});


};









// ============================
// Submit Order
// ============================


const handleSubmit=(e)=>{


e.preventDefault();






if(!cartItems || cartItems.length===0){


toast.error(

"Cart is empty"

);


return;


}







if(

!formData.fullName ||

!formData.phone ||

!formData.address ||

!formData.city ||

!formData.pincode

){


toast.warning(

"Please fill all required fields"

);


return;


}







const orderData={


shippingAddress:{

    fullName:formData.fullName,

    phone:formData.phone,

    address:formData.address,

    city:formData.city,

    state:formData.state,

    pincode:formData.pincode

},


paymentMethod:

formData.paymentMethod,


items:cartItems.map(item=>({

product:item.product._id,

quantity:item.quantity

})),


totalAmount


};







dispatch(createOrder(orderData))

.then((result)=>{


if(result.meta.requestStatus==="fulfilled"){


toast.success(

"Order placed successfully"

);



dispatch(clearCart());



navigate("/orders");


}



});


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


<h3

className="
fw-bold
mb-4
"

>

Checkout

</h3>






<form onSubmit={handleSubmit}>




<div className="row">



<div className="col-md-6 mb-3">


<label className="form-label">

Full Name

</label>


<input


type="text"


name="fullName"


className="form-control"


value={formData.fullName}


onChange={handleChange}


/>


</div>






<div className="col-md-6 mb-3">


<label className="form-label">

Phone Number

</label>


<input


type="text"


name="phone"


className="form-control"


value={formData.phone}


onChange={handleChange}


/>


</div>





</div>









<div className="mb-3">


<label className="form-label">

Address

</label>


<textarea


name="address"


className="form-control"


rows="3"


value={formData.address}


onChange={handleChange}


/>


</div>








<div className="row">


<div className="col-md-4 mb-3">


<label className="form-label">

City

</label>


<input


name="city"


className="form-control"


value={formData.city}


onChange={handleChange}


/>


</div>






<div className="col-md-4 mb-3">


<label className="form-label">

State

</label>


<input


name="state"


className="form-control"


value={formData.state}


onChange={handleChange}


/>


</div>






<div className="col-md-4 mb-3">


<label className="form-label">

Pincode

</label>


<input


name="pincode"


className="form-control"


value={formData.pincode}


onChange={handleChange}


/>


</div>


</div>









<h5 className="mt-3">

Payment Method

</h5>





<div className="form-check">


<input


className="form-check-input"


type="radio"


name="paymentMethod"


value="COD"


checked={formData.paymentMethod==="COD"}


onChange={handleChange}


/>


<label className="form-check-label">


<FaMoneyBillWave/>

 Cash On Delivery


</label>


</div>







<div className="form-check mb-4">


<input


className="form-check-input"


type="radio"


name="paymentMethod"


value="ONLINE"


checked={formData.paymentMethod==="ONLINE"}


onChange={handleChange}


/>


<label className="form-check-label">


<FaCreditCard/>

 Online Payment


</label>


</div>







<button


className="
btn
btn-primary
w-100
"


disabled={loading}


>


{

loading

?

"Placing Order..."

:

`Place Order ₹${totalAmount}`

}


</button>





</form>




</div>


</div>


);


};



export default CheckoutForm;