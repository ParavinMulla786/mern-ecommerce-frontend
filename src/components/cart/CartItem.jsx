import React from "react";


import {
    FaPlus,
    FaMinus,
    FaTrash
} from "react-icons/fa";


import {
    useDispatch
} from "react-redux";


import {
    toast
} from "react-toastify";


import {

    updateCartQuantity,

    removeFromCart

} from "../../redux/cartSlice";





const CartItem = ({
    item
}) => {


const dispatch = useDispatch();




// Product data handling

const product = item.product || item;





const quantity = item.quantity || 1;





// ================================
// Increase Quantity
// ================================


const increaseQuantity = () => {



const maxStock = product.stock || 0;



if(quantity >= maxStock){


toast.warning(

"Maximum stock available reached"

);


return;


}



dispatch(

updateCartQuantity({

cartItemId:item._id,

quantity:quantity + 1

})

);



};








// ================================
// Decrease Quantity
// ================================


const decreaseQuantity = () => {



if(quantity <= 1){


toast.info(

"Minimum quantity is 1"

);


return;


}




dispatch(

updateCartQuantity({

cartItemId:item._id,

quantity:quantity - 1

})

);



};









// ================================
// Remove Item
// ================================


const removeItem = () => {



dispatch(

removeFromCart(item._id)

);



toast.success(

"Product removed from cart"

);


};









return (


<div

className="
card
border-0
shadow-sm
mb-3
"

>


<div

className="
card-body
"

>


<div

className="
row
align-items-center
"

>



{/* Product Image */}


<div

className="
col-md-2
"

>


<img


src={

product.images?.[0]

?

product.images[0]

:

"/images/no-image.png"

}


alt={product.name}


className="
img-fluid
rounded
"

style={{

height:"90px",

width:"90px",

objectFit:"cover"

}}


/>


</div>









{/* Product Details */}


<div

className="
col-md-4
"

>


<h6

className="
fw-bold
"

>

{product.name}

</h6>



<p

className="
text-muted
mb-0
"

>


₹ {product.price}


</p>


</div>









{/* Quantity */}


<div

className="
col-md-3
"

>


<div

className="
d-flex
align-items-center
gap-2
"

>


<button


className="
btn
btn-outline-secondary
btn-sm
"


onClick={decreaseQuantity}


>


<FaMinus/>

</button>






<span

className="
fw-bold
"

>


{quantity}


</span>







<button


className="
btn
btn-outline-secondary
btn-sm
"


onClick={increaseQuantity}


>


<FaPlus/>

</button>



</div>


</div>









{/* Price + Remove */}


<div

className="
col-md-3
text-md-end
"

>


<h6

className="
fw-bold
"

>


₹ {product.price * quantity}


</h6>




<button


className="
btn
btn-outline-danger
btn-sm
"


onClick={removeItem}


>


<FaTrash/> Remove


</button>



</div>







</div>



</div>



</div>


);


};


export default CartItem;