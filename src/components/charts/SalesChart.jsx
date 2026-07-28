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


import {

Line

} from "react-chartjs-2";



import {

Chart as ChartJS,

CategoryScale,

LinearScale,

PointElement,

LineElement,

Title,

Tooltip,

Legend

} from "chart.js";



import {

getAdminDashboard,

getVendorDashboard

} from "../../redux/dashboardSlice";



import Loader from "../common/Loader";


import EmptyState from "../common/EmptyState";


import ErrorMessage from "../common/ErrorMessage";







ChartJS.register(

CategoryScale,

LinearScale,

PointElement,

LineElement,

Title,

Tooltip,

Legend

);









const SalesChart = ({

role="admin"

}) => {



const dispatch = useDispatch();







const {

adminStats,

vendorStats,

loading,

error

}=useSelector(

(state)=>state.dashboard

);








// ================================
// Fetch Dashboard Data
// ================================


useEffect(()=>{


if(role==="admin"){


dispatch(

getAdminDashboard()

);


}

else{


dispatch(

getVendorDashboard()

);


}


},[dispatch,role]);








useEffect(()=>{


if(error){


toast.error(error);


}


},[error]);









if(loading){


return <Loader/>;


}







if(error){


return (

<ErrorMessage

message={error}

/>

);


}








const salesData =

role==="admin"

?

adminStats?.salesData

:

vendorStats?.salesData;









if(

!salesData ||

salesData.length===0

){


return (

<EmptyState

title="No Sales Data"

description="Sales analytics will appear here"

/>

);


}









const chartData={



labels:

salesData.map(

(item)=>item.month

),



datasets:[

{

label:"Sales Revenue",

data:

salesData.map(

(item)=>item.sales

),

tension:0.4

}

]

};








const options={


responsive:true,


plugins:{


legend:{


position:"top"

},


title:{


display:true,

text:"Monthly Sales Report"

}


},


scales:{


y:{


beginAtZero:true


}


}



};








return (


<div

className="
card
border-0
shadow-sm
"

>


<div

className="
card-body
"

>


<h5

className="
fw-bold
mb-4
"

>

Sales Analytics

</h5>




<div

style={{

height:"350px"

}}

>


<Line

data={chartData}

options={options}

/>


</div>





</div>


</div>


);


};



export default SalesChart;