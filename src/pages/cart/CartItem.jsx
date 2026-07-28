import React from "react";


import {
    useDispatch
} from "react-redux";


import {
    FaTrash,
    FaMinus,
    FaPlus
} from "react-icons/fa";


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









    const increaseQuantity=()=>{


        if(
            item.quantity >= item.product.stock
        )
        {

            toast.warning(
                "Maximum stock reached"
            );

            return;

        }





        dispatch(

            updateCartQuantity({

                id:item._id,

                quantity:
                item.quantity + 1

            })

        );



    };









    const decreaseQuantity=()=>{


        if(
            item.quantity <= 1
        )
        {

            return;

        }






        dispatch(

            updateCartQuantity({

                id:item._id,

                quantity:
                item.quantity - 1

            })

        );


    };









    const removeItem=()=>{


        dispatch(

            removeFromCart(
                item._id
            )

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Removed from cart"
            );


        })

        .catch(()=>{


            toast.error(
                "Remove failed"
            );


        });


    };









    return (

<div className="
card
border-0
shadow-sm
mb-3
">


<div className="card-body">



<div className="row align-items-center">







{/* IMAGE */}


<div className="col-md-2">


<img


src={

item.product?.images?.[0]

||

"/images/no-image.png"

}


alt={item.product?.name}


className="
img-fluid
rounded
"


style={{

height:"90px",

objectFit:"cover"

}}


/>


</div>









{/* DETAILS */}



<div className="col-md-4">



<h5 className="fw-bold">


{

item.product?.name

}


</h5>



<p className="text-muted mb-1">


₹

{

item.product?.price

}


</p>



<small>


Stock :

{

item.product?.stock

}


</small>



</div>









{/* QUANTITY */}



<div className="col-md-3">



<div className="
d-flex
align-items-center
gap-2
">


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







<span className="
fw-bold
px-2
">


{

item.quantity

}


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









{/* TOTAL */}



<div className="col-md-2">


<h5 className="fw-bold">


₹

{

item.product?.price *

item.quantity

}


</h5>



</div>









{/* REMOVE */}



<div className="col-md-1">



<button


className="
btn
btn-danger
btn-sm
"


onClick={removeItem}


>


<FaTrash/>


</button>



</div>









</div>



</div>



</div>

    );

};



export default CartItem;