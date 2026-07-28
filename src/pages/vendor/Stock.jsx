import React, {
    useEffect,
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    FaBoxes,
    FaSearch,
    FaExclamationTriangle,
    FaEdit
} from "react-icons/fa";


import {
    toast
} from "react-toastify";


import {
    getVendorProducts,
    updateStock
} from "../../redux/productSlice";


import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";

import Pagination from "../../components/pagination/Pagination";









const Stock = () => {


    const dispatch = useDispatch();





    const {

        products,
        loading,
        error,
        pagination

    } = useSelector(
        state=>state.product
    );








    const [
        page,
        setPage
    ] = useState(1);



    const [
        search,
        setSearch
    ] = useState("");









    useEffect(()=>{


        dispatch(

            getVendorProducts({

                page,

                search

            })

        );


    },[
        dispatch,
        page,
        search
    ]);









    const handleUpdateStock=(id,current)=>{


        const quantity =

        prompt(
            "Enter new stock quantity",
            current
        );





        if(quantity===null)
        {
            return;
        }






        if(
            Number(quantity)<0
        )
        {

            toast.error(
                "Stock cannot be negative"
            );

            return;

        }








        dispatch(

            updateStock({

                id,

                stock:Number(quantity)

            })

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Stock updated successfully"
            );


        })


        .catch(err=>{


            toast.error(
                err ||
                "Update failed"
            );


        });


    };









    const stockBadge=(stock)=>{


        if(stock===0)
        {

            return (

                <span className="
                badge
                bg-danger
                ">

                Out Of Stock

                </span>

            );

        }



        if(stock<10)
        {

            return (

                <span className="
                badge
                bg-warning
                text-dark
                ">

                Low Stock

                </span>

            );

        }




        return (

            <span className="
            badge
            bg-success
            ">

            Available

            </span>

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


<FaBoxes/>

{" "}

Stock Management


</h1>


<p className="text-muted">

Manage product inventory

</p>


</div>









{/* SEARCH */}



<div className="
card
border-0
shadow-sm
mb-4
">


<div className="card-body">



<div className="input-group">


<span className="input-group-text">

<FaSearch/>

</span>



<input


className="form-control"


placeholder="Search product..."


value={search}


onChange={(e)=>

setSearch(
e.target.value
)

}


/>



</div>


</div>


</div>









{/* LOW STOCK ALERT */}



<div className="
alert
alert-warning
d-flex
align-items-center
">


<FaExclamationTriangle/>

{" "}

Products with stock less than 10 need attention.


</div>









<div className="
card
border-0
shadow-sm
">


<div className="card-body">



<div className="table-responsive">



<table className="table align-middle">



<thead className="table-light">


<tr>


<th>

Image

</th>


<th>

Product

</th>


<th>

Stock

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

products?.map(product=>(



<tr

key={product._id}

>



<td>


<img


src={

product.images?.[0]

||

"/images/no-image.png"

}


width="55"

height="55"


className="rounded"


alt="product"


/>


</td>









<td>


<strong>

{

product.name

}


</strong>



<br/>



<small>

SKU :

{

product._id.slice(-6)

}

</small>



</td>









<td>


<h5>


{

product.stock

}


</h5>



</td>









<td>


{

stockBadge(
product.stock
)

}



</td>









<td>


<button


className="
btn
btn-primary
btn-sm
"



onClick={()=>


handleUpdateStock(

product._id,

product.stock

)


}


>


<FaEdit/>

{" "}

Update


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


onPageChange={setPage}


/>


}



</div>

    );

};



export default Stock;