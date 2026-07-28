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
    FaMapMarkerAlt,
    FaCreditCard,
    FaMoneyBillWave
} from "react-icons/fa";


import {
    toast
} from "react-toastify";


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
        total

    } = useSelector(
        state=>state.cart
    );







    const [formData,setFormData] =
    useState({

        fullName:"",

        phone:"",

        address:"",

        city:"",

        state:"",

        pincode:"",

        paymentMethod:"COD"

    });








    const handleChange=(e)=>{


        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });


    };









    const handleSubmit=(e)=>{


        e.preventDefault();







        if(
            !formData.fullName ||
            !formData.phone ||
            !formData.address ||
            !formData.city ||
            !formData.pincode
        )
        {

            toast.error(
                "Please fill all address details"
            );


            return;

        }








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









        const orderData={


            shippingAddress:{

                fullName:
                formData.fullName,


                phone:
                formData.phone,


                address:
                formData.address,


                city:
                formData.city,


                state:
                formData.state,


                pincode:
                formData.pincode

            },


            paymentMethod:
            formData.paymentMethod,


            items:

            cartItems.map(item=>(

            {

                product:
                item.product._id,


                quantity:
                item.quantity


            }

            )),


            totalAmount:
            total



        };









        dispatch(

            createOrder(
                orderData
            )

        )

        .unwrap()

        .then((res)=>{


            toast.success(
                "Order placed successfully"
            );



            dispatch(
                clearCart()
            );



            navigate(
                "/orders"
            );



        })

        .catch(err=>{


            toast.error(
                err ||
                "Order failed"
            );


        });



    };









    return (

<div className="
card
border-0
shadow-sm
">


<div className="card-body">


<h3 className="fw-bold mb-4">


<FaMapMarkerAlt/>

{" "}

Shipping Details


</h3>









<form onSubmit={handleSubmit}>



<div className="row g-3">







<div className="col-md-6">


<label className="form-label">

Full Name

</label>


<input


className="form-control"


name="fullName"


value={
formData.fullName
}


onChange={handleChange}


/>



</div>









<div className="col-md-6">


<label className="form-label">

Phone Number

</label>


<input


className="form-control"


name="phone"


value={
formData.phone
}


onChange={handleChange}


/>



</div>









<div className="col-12">


<label className="form-label">

Address

</label>


<textarea


className="form-control"


rows="3"


name="address"


value={
formData.address
}


onChange={handleChange}


/>


</div>









<div className="col-md-4">


<label>

City

</label>


<input


className="form-control"


name="city"


value={
formData.city
}


onChange={handleChange}


/>


</div>









<div className="col-md-4">


<label>

State

</label>


<input


className="form-control"


name="state"


value={
formData.state
}


onChange={handleChange}


/>


</div>









<div className="col-md-4">


<label>

Pincode

</label>


<input


className="form-control"


name="pincode"


value={
formData.pincode
}


onChange={handleChange}


/>


</div>









<div className="col-12">


<hr/>


<h5>


<FaCreditCard/>

{" "}

Payment Method


</h5>



<div className="form-check mt-3">


<input


className="form-check-input"


type="radio"


name="paymentMethod"


value="COD"


checked={
formData.paymentMethod==="COD"
}


onChange={handleChange}


/>



<label className="form-check-label">

Cash On Delivery

</label>



</div>








<div className="form-check">


<input


className="form-check-input"


type="radio"


name="paymentMethod"


value="ONLINE"


checked={
formData.paymentMethod==="ONLINE"
}


onChange={handleChange}


/>



<label className="form-check-label">


<FaMoneyBillWave/>

{" "}

Online Payment


</label>



</div>



</div>









<div className="col-12">


<button


className="
btn
btn-primary
w-100
mt-3
"


type="submit"


>


Place Order


</button>



</div>






</div>





</form>






</div>


</div>

    );

};



export default CheckoutForm;