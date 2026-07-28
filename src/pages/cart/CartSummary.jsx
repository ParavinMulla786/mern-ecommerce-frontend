import React, {
    useState
} from "react";


import {
    useSelector
} from "react-redux";


import {
    useNavigate
} from "react-router-dom";


import {
    FaShoppingBag,
    FaTruck,
    FaTag,
    FaArrowRight
} from "react-icons/fa";


import {
    toast
} from "react-toastify";









const CartSummary = () => {


    const navigate = useNavigate();





    const {

        cartItems,
        subtotal,
        discount,
        shippingCharge,
        total

    } = useSelector(
        state=>state.cart
    );









    const [
        coupon,
        setCoupon
    ] = useState("");




    const [
        couponApplied,
        setCouponApplied
    ] = useState(false);









    const applyCoupon=()=>{


        if(!coupon)
        {

            toast.warning(
                "Enter coupon code"
            );

            return;

        }





        /*
            Coupon API can be connected here

            Example:
            POST /api/coupon/apply

        */





        if(
            coupon.toUpperCase()
            ===
            "SAVE10"
        )
        {

            setCouponApplied(true);


            toast.success(
                "Coupon applied"
            );


        }

        else
        {

            toast.error(
                "Invalid coupon"
            );

        }


    };









    const checkout=()=>{


        if(
            !cartItems ||
            cartItems.length===0
        )
        {

            toast.warning(
                "Cart is empty"
            );


            return;

        }






        navigate(
            "/checkout"
        );


    };









    return (

<div className="
card
border-0
shadow-sm
">


<div className="card-body">



<h4 className="fw-bold mb-4">


<FaShoppingBag/>

{" "}

Order Summary


</h4>









{/* ITEMS */}



<div className="
d-flex
justify-content-between
mb-3
">


<span>

Items

</span>


<strong>


{

cartItems?.length || 0

}


</strong>



</div>









{/* SUBTOTAL */}



<div className="
d-flex
justify-content-between
mb-3
">


<span>

Subtotal

</span>


<strong>


₹

{

subtotal || 0

}


</strong>



</div>









{/* DISCOUNT */}



<div className="
d-flex
justify-content-between
mb-3
text-success
">


<span>

Discount

</span>


<strong>


-

₹

{

discount || 0

}


</strong>



</div>









{/* SHIPPING */}



<div className="
d-flex
justify-content-between
mb-3
">


<span>


<FaTruck/>

{" "}

Shipping


</span>



<strong>


₹

{

shippingCharge || 0

}


</strong>



</div>









<hr/>









{/* COUPON */}



<div className="mb-3">


<label className="form-label">


<FaTag/>

{" "}

Apply Coupon


</label>




<div className="input-group">


<input


type="text"


className="form-control"


placeholder="SAVE10"


value={coupon}


onChange={(e)=>

setCoupon(
e.target.value
)

}


/>




<button


className="
btn
btn-outline-primary
"


onClick={applyCoupon}


disabled={
couponApplied
}


>


Apply


</button>




</div>


</div>









<hr/>









{/* TOTAL */}



<div className="
d-flex
justify-content-between
mb-4
">


<h5>

Total


</h5>


<h4 className="fw-bold">


₹

{

couponApplied

?

total - (total * 10 / 100)

:

total || 0

}



</h4>



</div>









<button


className="
btn
btn-primary
w-100
"


onClick={checkout}


>


Proceed To Checkout


<FaArrowRight/>

</button>









</div>


</div>

    );

};



export default CartSummary;