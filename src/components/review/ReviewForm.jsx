import React, {
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    FaStar
} from "react-icons/fa";


import {
    toast
} from "react-toastify";


import {
    createReview
} from "../../redux/reviewSlice";









const ReviewForm = ({
    productId
}) => {


    const dispatch = useDispatch();





    const {
        user
    } = useSelector(
        state=>state.auth
    );








    const [
        rating,
        setRating
    ] = useState(0);




    const [
        comment,
        setComment
    ] = useState("");








    const [
        hover,
        setHover
    ] = useState(0);









    const handleSubmit=(e)=>{


        e.preventDefault();






        if(!user)
        {

            toast.error(
                "Please login first"
            );

            return;

        }








        if(rating===0)
        {

            toast.error(
                "Please select rating"
            );


            return;

        }








        if(comment.trim()==="")
        {

            toast.error(
                "Write your review"
            );


            return;

        }









        const reviewData={


            productId,


            rating,


            comment



        };









        dispatch(

            createReview(
                reviewData
            )

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Review added successfully"
            );


            setRating(0);

            setComment("");



        })

        .catch((err)=>{


            toast.error(

                err ||

                "Review failed"

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



<h4 className="mb-4">

Write a Review

</h4>








<form onSubmit={handleSubmit}>







<div className="mb-3">


<label className="form-label">

Rating

</label>



<div>


{

[1,2,3,4,5]

.map(star=>(


<FaStar


key={star}


size={28}


className="me-2"


style={{

cursor:"pointer"

}}


color={

star <=
(hover || rating)

?

"#ffc107"

:

"#ddd"

}



onMouseEnter={()=>


setHover(star)

}


onMouseLeave={()=>


setHover(0)

}


onClick={()=>


setRating(star)

}


/>



))


}

</div>


</div>









<div className="mb-3">


<label className="form-label">

Comment

</label>



<textarea


className="form-control"


rows="4"


placeholder="Write your experience..."


value={comment}


onChange={(e)=>

setComment(
e.target.value
)

}


/>



</div>









<button


className="
btn
btn-primary
"


type="submit"


>


Submit Review


</button>





</form>





</div>


</div>

    );

};



export default ReviewForm;