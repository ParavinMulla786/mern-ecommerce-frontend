import React, {
    useEffect,
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    FaStar,
    FaTrash,
    FaSearch,
    FaCommentDots,
    FaCheckCircle
} from "react-icons/fa";


import {
    toast
} from "react-toastify";



import {
    getAllReviews,
    deleteReview,
    updateReviewStatus
} from "../../redux/reviewSlice";



import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";

import Pagination from "../../components/pagination/Pagination";









const Reviews = () => {


    const dispatch = useDispatch();




    const {

        reviews,
        loading,
        error,
        pagination

    } = useSelector(
        state=>state.review
    );







    const [page,setPage] =
    useState(1);



    const [search,setSearch] =
    useState("");



    const [rating,setRating] =
    useState("");









    useEffect(()=>{


        dispatch(

            getAllReviews({

                page,

                search,

                rating

            })

        );


    },[
        dispatch,
        page,
        search,
        rating
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

            deleteReview(id)

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Review deleted successfully"
            );


        })


        .catch(err=>{


            toast.error(
                err ||
                "Delete failed"
            );


        });



    };









    const handleStatus=(id)=>{


        dispatch(

            updateReviewStatus(id)

        )

        .unwrap()


        .then(()=>{


            toast.success(
                "Review status updated"
            );


        })


        .catch(err=>{


            toast.error(
                err
            );


        });



    };









    const renderStars=(count)=>{


        return (

            <>

            {

            [...Array(5)]

            .map((_,index)=>(


                <FaStar

                key={index}

                className={

                index < count

                ?

                "text-warning"

                :

                "text-secondary"

                }


                />


            ))

            }

            </>

        );


    };









    if(loading)
    {

        return <Loader/>;

    }









    if(error)
    {

        return (

            <ErrorMessage

                message={error}

            />

        );

    }









    return (

<div>






<div className="mb-4">


<h1 className="fw-bold">


<FaCommentDots/>

{" "}

Manage Reviews


</h1>



<p className="text-muted">

Monitor customer feedback and ratings

</p>


</div>









{/* FILTER */}



<div className="
card
shadow-sm
border-0
mb-4
">


<div className="card-body">


<div className="row g-3">



<div className="col-md-8">


<div className="input-group">


<span className="input-group-text">


<FaSearch/>


</span>




<input


type="text"


className="form-control"


placeholder="Search reviews..."


value={search}


onChange={(e)=>

setSearch(
e.target.value
)

}


/>



</div>


</div>








<div className="col-md-4">


<select


className="form-select"


value={rating}


onChange={(e)=>

setRating(
e.target.value
)

}



>


<option value="">

All Ratings

</option>



<option value="5">

5 Star

</option>


<option value="4">

4 Star

</option>


<option value="3">

3 Star

</option>


<option value="2">

2 Star

</option>


<option value="1">

1 Star

</option>



</select>



</div>



</div>



</div>


</div>









{/* TABLE */}



<div className="
card
shadow-sm
border-0
">


<div className="card-body">


<div className="table-responsive">



<table className="table align-middle">



<thead className="table-light">


<tr>


<th>
Customer
</th>


<th>
Product
</th>


<th>
Rating
</th>


<th>
Comment
</th>


<th>
Status
</th>


<th>
Action
</th>


</tr>


</thead>







<tbody>



{

reviews?.map(review=>(



<tr

key={
review._id
}

>




<td>


<strong>

{

review.user?.name

||

"Customer"

}


</strong>


<br/>


<small>

{

review.user?.email

}


</small>



</td>









<td>


{

review.product?.name

||

"Product"

}



</td>









<td>


<div>


{

renderStars(
review.rating
)

}


</div>



</td>









<td>


{

review.comment

}



</td>









<td>


<button


className={

review.isApproved

?

"btn btn-success btn-sm"

:

"btn btn-warning btn-sm"

}



onClick={()=>


handleStatus(
review._id
)


}



>



{

review.isApproved

?

<>

<FaCheckCircle/>

{" "}

Approved

</>

:

"Pending"


}



</button>



</td>









<td>



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




</td>







</tr>



))

}




</tbody>



</table>


</div>



</div>


</div>









{

pagination &&


<Pagination


currentPage={page}


totalPages={

pagination.totalPages

}


onPageChange={

setPage

}


/>


}



</div>

    );

};



export default Reviews;