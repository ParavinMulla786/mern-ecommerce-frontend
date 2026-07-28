import React, {
    useEffect,
    useState
} from "react";


import {
    FaStar,
    FaTrash,
    FaEdit
} from "react-icons/fa";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    toast
} from "react-toastify";



import {

    getProductReviews,

    addReview,

    updateReview,

    deleteReview

} from "../../redux/reviewSlice";






const ProductReview = ({

    productId

}) => {



const dispatch = useDispatch();






const {

    reviews,

    loading,

    error

}=useSelector(

(state)=>state.review

);







const {

    user,

    isAuthenticated

}=useSelector(

(state)=>state.auth

);








const [rating,setRating]=useState(5);


const [comment,setComment]=useState("");


const [editId,setEditId]=useState(null);









// ===========================
// Fetch Reviews
// ===========================


useEffect(()=>{


dispatch(

getProductReviews(productId)

);



},[dispatch,productId]);









// ===========================
// Submit Review
// ===========================


const handleSubmit=(e)=>{


e.preventDefault();





if(!isAuthenticated){


toast.warning(

"Please login to review"

);


return;


}





if(!comment.trim()){


toast.error(

"Review cannot be empty"

);


return;


}








const reviewData={


productId,


rating,


comment


};







if(editId){



dispatch(

updateReview({

reviewId:editId,

reviewData

})

);



toast.success(

"Review updated"

);



setEditId(null);



}

else{



dispatch(

addReview(reviewData)

);



toast.success(

"Review added"

);



}





setComment("");

setRating(5);



};









// ===========================
// Edit Review
// ===========================


const editHandler=(review)=>{


setEditId(review._id);


setRating(review.rating);


setComment(review.comment);



};









// ===========================
// Delete Review
// ===========================


const deleteHandler=(id)=>{


dispatch(

deleteReview(id)

);



toast.success(

"Review deleted"

);


};









// Average Rating


const averageRating =

reviews?.length

?

(

reviews.reduce(

(sum,item)=>

sum + item.rating,

0

)

/

reviews.length

).toFixed(1)


:

0;









return (


<div className="mt-5">






{/* Header */}


<div

className="
card
shadow-sm
border-0
mb-4
"

>


<div

className="
card-body
"


>


<h4>

Customer Reviews

</h4>



<div

className="
d-flex
align-items-center
gap-2
"


>


<h2

className="
text-warning
mb-0
"

>


{averageRating}


</h2>



<div>


{


[1,2,3,4,5].map(star=>(


<FaStar

key={star}

className={

star <= Math.round(averageRating)

?

"text-warning"

:

"text-secondary"

}

/>


))


}



</div>




<span>

({reviews?.length || 0} Reviews)

</span>



</div>



</div>

</div>









{/* Add Review */}


<div

className="
card
shadow-sm
border-0
mb-4
"

>


<div

className="
card-body
"

>



<h5>

Write a Review

</h5>






<form

onSubmit={handleSubmit}

>





{/* Stars */}


<div className="mb-3">


<label className="form-label">

Rating

</label>


<div>


{


[1,2,3,4,5].map(star=>(


<FaStar


key={star}


size={25}


onClick={()=>setRating(star)}


style={{

cursor:"pointer"

}}


className={

star <= rating

?

"text-warning"

:

"text-secondary"

}


/>


))


}

</div>


</div>









<textarea


className="
form-control
mb-3
"


rows="4"


placeholder="Write your review..."


value={comment}


onChange={(e)=>

setComment(e.target.value)

}


/>








<button


className="
btn
btn-primary
"

>


{

editId

?

"Update Review"

:

"Submit Review"

}


</button>





</form>




</div>


</div>









{/* Reviews List */}


<div>


{


reviews?.map((review)=>(



<div

key={review._id}

className="
card
shadow-sm
border-0
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
d-flex
justify-content-between
"

>


<div>


<h6

className="
mb-1
"

>

{

review.user?.name

}

</h6>





<div>


{


[1,2,3,4,5].map(star=>(


<FaStar


key={star}


className={

star <= review.rating

?

"text-warning"

:

"text-secondary"

}


/>


))


}

</div>



</div>







{

user?._id===review.user?._id &&



<div>


<button


className="
btn
btn-sm
btn-outline-primary
me-2
"


onClick={()=>editHandler(review)}


>


<FaEdit/>


</button>







<button


className="
btn
btn-sm
btn-outline-danger
"


onClick={()=>deleteHandler(review._id)}


>


<FaTrash/>


</button>



</div>



}



</div>









<p

className="
mt-3
"

>

{review.comment}

</p>




</div>


</div>



))


}



</div>





</div>


);


};



export default ProductReview;