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
    FaDownload,
    FaShoppingCart,
    FaUsers,
    FaMoneyBillWave,
    FaBox
} from "react-icons/fa";


import {
    toast
} from "react-toastify";


import {
    getAdminDashboard
} from "../../redux/dashboardSlice";


import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";









const Reports = () => {


    const dispatch = useDispatch();





    const {

        dashboard,
        loading,
        error

    } = useSelector(
        state=>state.dashboard
    );







    const [startDate,setStartDate] =
    useState("");



    const [endDate,setEndDate] =
    useState("");









    useEffect(()=>{


        dispatch(

            getAdminDashboard({

                startDate,

                endDate

            })

        );


    },[
        dispatch,
        startDate,
        endDate
    ]);









    const exportCSV=()=>{


        if(!dashboard)
        {

            toast.error(
                "No report data"
            );

            return;

        }





        const rows=[

            [
                "Report",
                "Value"
            ],


            [
                "Total Users",
                dashboard.totalUsers
            ],


            [
                "Total Orders",
                dashboard.totalOrders
            ],


            [
                "Revenue",
                dashboard.totalRevenue
            ],


            [
                "Products",
                dashboard.totalProducts
            ]

        ];





        const csvContent =

        rows

        .map(row=>

            row.join(",")

        )

        .join("\n");






        const blob =

        new Blob(

            [csvContent],

            {
                type:
                "text/csv"
            }

        );






        const url =

        window.URL.createObjectURL(
            blob
        );






        const link =

        document.createElement(
            "a"
        );



        link.href=url;



        link.download=
        "admin-report.csv";



        link.click();




        toast.success(
            "Report exported"
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





<div className="d-flex justify-content-between align-items-center mb-4">


<div>


<h1 className="fw-bold">


<FaChartLine/>

{" "}

Reports


</h1>


<p className="text-muted">

Business performance analytics

</p>


</div>






<button

className="
btn
btn-success
"

onClick={exportCSV}

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


<label>

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


<label>

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









{/* REPORT CARDS */}



<div className="row g-4">





<div className="col-md-3">


<div className="
card
shadow-sm
border-0
">


<div className="card-body">


<div className="d-flex justify-content-between">


<div>


<h6>

Users

</h6>


<h3>


{

dashboard?.totalUsers || 0

}


</h3>


</div>



<FaUsers size={35}/>


</div>


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


<div className="d-flex justify-content-between">


<div>


<h6>

Orders

</h6>


<h3>


{

dashboard?.totalOrders || 0

}


</h3>


</div>



<FaShoppingCart size={35}/>


</div>


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


<div className="d-flex justify-content-between">


<div>


<h6>

Revenue

</h6>


<h3>


₹

{

dashboard?.totalRevenue || 0

}


</h3>


</div>



<FaMoneyBillWave size={35}/>


</div>


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


<div className="d-flex justify-content-between">


<div>


<h6>

Products

</h6>


<h3>


{

dashboard?.totalProducts || 0

}


</h3>


</div>



<FaBox size={35}/>


</div>


</div>


</div>


</div>







</div>









{/* SALES DATA */}



<div className="
card
border-0
shadow-sm
mt-4
">


<div className="card-body">


<h4>

Sales Overview

</h4>




{

dashboard?.salesGraph?.length

?

dashboard.salesGraph.map(

(item,index)=>(


<div

key={index}

className="
border-bottom
py-2
"


>


<strong>

{

item.date

}

</strong>


:

₹

{

item.amount

}



</div>


)

)


:

<p className="text-muted">

No sales data available

</p>


}



</div>


</div>







</div>

    );

};



export default Reports;