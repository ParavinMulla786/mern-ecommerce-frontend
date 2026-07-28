import React, {
    useEffect,
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    FaChartLine,
    FaMoneyBillWave,
    FaShoppingBag,
    FaDownload,
    FaBox
} from "react-icons/fa";


import {
    toast
} from "react-toastify";


import {
    getVendorDashboard
} from "../../redux/dashboardSlice";


import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";









const Sales = () => {


    const dispatch = useDispatch();





    const {

        dashboard,
        loading,
        error

    } = useSelector(
        state=>state.dashboard
    );







    const [
        startDate,
        setStartDate
    ] = useState("");



    const [
        endDate,
        setEndDate
    ] = useState("");









    useEffect(()=>{


        dispatch(

            getVendorDashboard({

                startDate,

                endDate

            })

        );


    },[
        dispatch,
        startDate,
        endDate
    ]);









    const exportReport=()=>{


        if(!dashboard)
        {

            toast.error(
                "No sales data"
            );

            return;

        }






        const data=[

            [
                "Metric",
                "Value"
            ],

            [
                "Total Sales",
                dashboard.sales
            ],

            [
                "Revenue",
                dashboard.revenue
            ],

            [
                "Orders",
                dashboard.totalOrders
            ],

            [
                "Products",
                dashboard.totalProducts
            ]

        ];






        const csv =

        data

        .map(row=>

            row.join(",")

        )

        .join("\n");






        const blob =

        new Blob(

            [csv],

            {
                type:
                "text/csv"
            }

        );





        const url =

        URL.createObjectURL(
            blob
        );






        const link =

        document.createElement(
            "a"
        );


        link.href=url;


        link.download=
        "vendor-sales.csv";


        link.click();




        toast.success(
            "Sales report exported"
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





<div className="
d-flex
justify-content-between
align-items-center
mb-4
">


<div>


<h1 className="fw-bold">


<FaChartLine/>

{" "}

Sales Report


</h1>


<p className="text-muted">

Analyze your store sales

</p>


</div>







<button


className="
btn
btn-success
"


onClick={exportReport}


>


<FaDownload/>

{" "}

Export CSV


</button>



</div>









{/* DATE FILTER */}



<div className="
card
border-0
shadow-sm
mb-4
">


<div className="card-body">


<div className="row g-3">



<div className="col-md-6">


<label className="form-label">

Start Date

</label>



<input


type="date"


className="form-control"


value={startDate}


onChange={(e)=>

setStartDate(
e.target.value
)

}


/>



</div>








<div className="col-md-6">


<label className="form-label">

End Date

</label>



<input


type="date"


className="form-control"


value={endDate}


onChange={(e)=>

setEndDate(
e.target.value
)

}


/>



</div>






</div>


</div>


</div>









{/* SALES CARDS */}



<div className="row g-4">





<div className="col-md-3">


<div className="
card
shadow-sm
border-0
">


<div className="card-body">


<h6>

Total Sales

</h6>



<h3>


<FaShoppingBag/>


{" "}

{

dashboard?.sales ||

0

}



</h3>



</div>


</div>


</div>









<div className="col-md-3">


<div className="
card
shadow-sm
border-0
">


<div className="card-body">


<h6>

Revenue

</h6>



<h3>


<FaMoneyBillWave/>


{" "}

₹

{

dashboard?.revenue ||

0

}



</h3>



</div>


</div>


</div>









<div className="col-md-3">


<div className="
card
shadow-sm
border-0
">


<div className="card-body">


<h6>

Orders

</h6>



<h3>


{

dashboard?.totalOrders ||

0

}



</h3>



</div>


</div>


</div>









<div className="col-md-3">


<div className="
card
shadow-sm
border-0
">


<div className="card-body">


<h6>

Products Sold

</h6>



<h3>


<FaBox/>


{" "}

{

dashboard?.totalProducts ||

0

}



</h3>



</div>


</div>


</div>







</div>









{/* MONTHLY SALES */}



<div className="
card
border-0
shadow-sm
mt-4
">


<div className="card-body">


<h4>

Monthly Sales

</h4>





{

dashboard?.salesGraph?.length

?


dashboard.salesGraph.map(

(item,index)=>(


<div

key={index}

className="
d-flex
justify-content-between
border-bottom
py-2
"

>


<span>

{

item.month ||

item.date

}

</span>



<strong>

₹

{

item.amount

}

</strong>



</div>


)


)


:

<p className="text-muted">

No sales available

</p>


}



</div>


</div>









{/* PRODUCT PERFORMANCE */}



<div className="
card
border-0
shadow-sm
mt-4
">


<div className="card-body">


<h4>

Top Selling Products

</h4>






{

dashboard?.topProducts?.length

?


dashboard.topProducts.map(

(product,index)=>(


<div

key={index}

className="
border-bottom
py-2
"

>


<strong>

{

product.name

}

</strong>



<span className="float-end">

{

product.sales

}

 Sold

</span>



</div>


)


)



:


<p className="text-muted">

No product data

</p>



}




</div>


</div>









</div>

    );

};



export default Sales;