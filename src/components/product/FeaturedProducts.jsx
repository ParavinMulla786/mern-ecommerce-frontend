import React, {
    useEffect
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    toast
} from "react-toastify";


import ProductCard from "./ProductCard";


import Loader from "../common/Loader";


import EmptyState from "../common/EmptyState";


import ErrorMessage from "../common/ErrorMessage";



import {

    getFeaturedProducts

} from "../../redux/productSlice";







const FeaturedProducts = () => {



const dispatch = useDispatch();





const {


    featuredProducts,

    loading,

    error


}=useSelector(

(state)=>state.product

);









// ===============================
// Fetch Featured Products
// ===============================


useEffect(()=>{


dispatch(

getFeaturedProducts()

);


},[dispatch]);









// ===============================
// Error Toast
// ===============================


useEffect(()=>{


if(error){


toast.error(error);


}


},[error]);









if(loading){


return (

<div

className="
text-center
py-5
"

>


<Loader/>


</div>

);


}









if(error){


return (

<ErrorMessage

message={error}

/>

);


}









if(

!featuredProducts ||

featuredProducts.length===0

){


return (


<EmptyState

icon="⭐"

title="No Featured Products"

description="Featured products will appear here."

/>


);


}









return (


<section

className="
py-5
"

>


<div

className="
container
"

>



<div

className="
d-flex
justify-content-between
align-items-center
mb-4
"

>


<h2

className="
fw-bold
"

>

Featured Products

</h2>


</div>









<div

className="
row
g-4
"

>


{


featuredProducts.map(

(product)=>(


<div


key={product._id}


className="
col-12
col-sm-6
col-md-4
col-lg-3
"


>


<ProductCard

product={product}

/>


</div>



)


)



}



</div>



</div>



</section>


);


};



export default FeaturedProducts;