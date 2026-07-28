import React, {
    useEffect
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    FaStar,
    FaTrash
} from "react-icons/fa";


import {
    toast
} from "react-toastify";


import {
    getProductReviews,
    deleteReview
} from "../../redux/reviewSlice";


import Loader from "../common/Loader";









const ReviewList = ({
    productId
}) => {


    const dispatch = useDispatch();







    const {

        reviews,
        loading

    } = useSelector(
        state=>state.review
    );







    const {
        user
    } = useSelector(
        state=>state.auth
    );









    useEffect(()=>{


        dispatch(

            getProductReviews(
                productId
            )

        );


    },[
        dispatch,
        productId
    ]);









    const handleDelete=(id)=>{


        if(
            !window.confirm(
                "Delete this review?"
            )
        )
        {

            return;

        }







        dispatch(

            deleteReview(
                id
            )

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Review deleted"
            );


        })

        .catch((err)=>{


            toast.error(

                err ||

                "Delete failed"

            );


        });


    };









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









    if(loading)
    {

        return <Loader/>;

    }









    return (

<div className="
card
border-0
shadow-sm
">


<div className="card-body">



<div className="
d-flex
justify-content-between
align-items-center
mb-4
">


<h4>

Customer Reviews

</h4>





<h5 className="text-warning">


<FaStar/>

{" "}

{

averageRating

}


/

5


</h5>



</div>









{

reviews?.length > 0

?

reviews.map(review=>(



<div

key={review._id}

className="
border-bottom
pb-3
mb-3
"


>





<div className="
d-flex
justify-content-between
">


<div>


<h6 className="fw-bold">


{

review.user?.name ||

"User"

}


</h6>



<div>


{

[1,2,3,4,5]

.map(star=>(


<FaStar


key={star}


size={16}


color={

star <= review.rating

?

"#ffc107"

:

"#ddd"

}


/>


))


}

</div>


</div>









{

(
user?._id === review.user?._id

||

user?.role==="admin"

)

&&


<button


className="
btn
btn-danger
btn-sm
"


onClick={()=>


handleDelete(
review._id
)


}


>


<FaTrash/>


</button>


}



</div>









<p className="mt-2 mb-0">


{

review.comment

}


</p>









</div>



))


:

<div className="text-muted">


No reviews available


</div>



}





</div>


</div>

    );

};



export default ReviewList;