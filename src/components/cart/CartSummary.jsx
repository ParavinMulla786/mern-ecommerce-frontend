import React from "react";


import {
    useSelector
} from "react-redux";


import {
    useNavigate
} from "react-router-dom";


import {
    FaShoppingCart,
    FaArrowRight
} from "react-icons/fa";





const CartSummary = () => {


const navigate = useNavigate();





const {

    cartItems,

    subtotal,

    discount,

    shippingCharge,

    totalAmount

} = useSelector(

(state)=>state.cart

);








// ================================
// Calculations
// ================================


const calculatedSubtotal = subtotal ||


cartItems?.reduce(

(total,item)=>{


const price =

item.product?.price || 0;


return total + (price * item.quantity);


},0

) || 0;








const calculatedDiscount = discount || 0;



const calculatedShipping =

shippingCharge ||


(calculatedSubtotal > 1000 ? 0 : 50);








const finalAmount =

totalAmount ||


(

calculatedSubtotal

-

calculatedDiscount

+

calculatedShipping

);








// ================================
// Checkout
// ================================


const checkoutHandler = ()=>{


if(!cartItems || cartItems.length===0){


return;


}


navigate("/checkout");


};








return (


<div

className="
card
shadow-sm
border-0
"

>


<div

className="
card-body
"

>


<h4

className="
fw-bold
mb-4
"

>

<FaShoppingCart/>

 Cart Summary

</h4>









<div

className="
d-flex
justify-content-between
mb-3
"

>


<span>

Subtotal

</span>


<strong>

₹ {calculatedSubtotal}

</strong>



</div>









<div

className="
d-flex
justify-content-between
mb-3
"

>


<span>

Discount

</span>


<strong

className="
text-success
"

>

- ₹ {calculatedDiscount}

</strong>


</div>









<div

className="
d-flex
justify-content-between
mb-3
"

>


<span>

Shipping

</span>


<strong>


{


calculatedShipping===0

?

"FREE"

:

`₹ ${calculatedShipping}`


}


</strong>


</div>








<hr/>







<div

className="
d-flex
justify-content-between
mb-4
"

>


<h5>

Total

</h5>



<h5

className="
text-primary
"

>


₹ {finalAmount}


</h5>



</div>









<button


className="
btn
btn-primary
w-100
"


disabled={

!cartItems ||

cartItems.length===0

}


onClick={checkoutHandler}


>


Proceed To Checkout


<FaArrowRight className="ms-2"/>


</button>







</div>


</div>


);


};



export default CartSummary;