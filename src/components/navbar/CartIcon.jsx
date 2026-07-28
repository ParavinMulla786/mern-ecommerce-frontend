import React from "react";


import {
    FaShoppingCart
} from "react-icons/fa";


import {
    Link
} from "react-router-dom";


import {
    useSelector
} from "react-redux";



import {
    selectCartItems
} from "../../redux/cartSlice";





const CartIcon = ()=>{


    const cartItems = useSelector(

        selectCartItems

    );





    const count =

    cartItems?.reduce(

        (total,item)=>

        total + item.quantity,

        0

    ) || 0;






return (

<Link

to="/cart"

className="
position-relative
text-dark
text-decoration-none
"

>


<FaShoppingCart

size={24}

/>





{

count > 0 &&


<span

className="
position-absolute
top-0
start-100
translate-middle
badge
rounded-pill
bg-danger
"

>

{count}


</span>


}



</Link>

);


};



export default CartIcon;