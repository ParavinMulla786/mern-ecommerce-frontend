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
    getRelatedProducts
} from "../../redux/productSlice";







const RelatedProducts = ({

    productId,

    categoryId

}) => {



const dispatch = useDispatch();






const {

    relatedProducts,

    loading,

    error


}=useSelector(

(state)=>state.product

);









// ===============================
// Fetch Related Products
// ===============================


useEffect(()=>{


if(productId && categoryId){


dispatch(

getRelatedProducts({

productId,

categoryId

})

);


}



},[

dispatch,

productId,

categoryId

]);









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









if(!relatedProducts || relatedProducts.length===0){


return null;


}









return (


<section

className="
mt-5
"

>


<h3

className="
mb-4
fw-bold
"

>

Related Products

</h3>





<div

className="
row
g-4
"

>


{


relatedProducts

.filter(

(product)=>

product._id !== productId

)

.map(

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





</section>


);


};



export default RelatedProducts;