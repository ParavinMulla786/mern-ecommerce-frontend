import React, {
    useState
} from "react";


import {
    FaSortAmountDown,
    FaTimes
} from "react-icons/fa";


import {
    useDispatch
} from "react-redux";


import {
    toast
} from "react-toastify";


import {
    getProducts
} from "../../redux/productSlice";





const ProductSort = ({

    filters={},

    onSortChange

}) => {



const dispatch = useDispatch();





const [sort,setSort] = useState("");









// ===============================
// Sort Options
// ===============================


const sortOptions=[


{
    value:"latest",
    label:"Latest Products"
},


{
    value:"price_low",
    label:"Price: Low to High"
},


{
    value:"price_high",
    label:"Price: High to Low"
},


{
    value:"rating",
    label:"Highest Rating"
},


{
    value:"popular",
    label:"Most Popular"
},


{
    value:"discount",
    label:"Biggest Discount"
}



];









// ===============================
// Change Sort
// ===============================


const handleSort=(e)=>{


const value=e.target.value;


setSort(value);


};









// ===============================
// Apply Sorting
// ===============================


const applySort=()=>{


if(!sort){


toast.info(

"Please select sorting option"

);


return;


}




const sortingData={


...filters,


sort


};






dispatch(

getProducts(sortingData)

);





if(onSortChange){


onSortChange(sortingData);


}




};









// ===============================
// Clear Sort
// ===============================


const clearSort=()=>{


setSort("");



dispatch(

getProducts(filters)

);



toast.success(

"Sorting cleared"

);


};









return (

<div

className="
card
border-0
shadow-sm
mb-4
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
g-3
"

>



{/* Heading */}


<div

className="
col-md-3
"

>


<h6

className="
mb-0
fw-bold
d-flex
align-items-center
gap-2
"

>


<FaSortAmountDown/>

Sort Products


</h6>


</div>









{/* Select */}


<div

className="
col-md-6
"

>


<select


className="
form-select
"


value={sort}


onChange={handleSort}


>


<option value="">


Select Sorting


</option>



{


sortOptions.map(option=>(


<option


key={option.value}


value={option.value}


>


{option.label}


</option>


))


}



</select>



</div>









{/* Buttons */}



<div

className="
col-md-3
d-flex
gap-2
"

>



<button


className="
btn
btn-primary
flex-grow-1
"


onClick={applySort}


>


Apply


</button>







<button


className="
btn
btn-outline-danger
"


onClick={clearSort}


>


<FaTimes/>


</button>



</div>






</div>



</div>



</div>


);


};



export default ProductSort;