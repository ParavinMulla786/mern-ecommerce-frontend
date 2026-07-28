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

FaUsers,

FaStore,

FaBox,

FaShoppingCart,

FaMoneyBillWave,

FaChartLine

} from "react-icons/fa";



import DashboardCard from "./DashboardCard";


import Loader from "../common/Loader";


import ErrorMessage from "../common/ErrorMessage";



import {

getAdminDashboard,

getVendorDashboard

} from "../../redux/dashboardSlice";







const DashboardStats = ({

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








// ================================
// Error Toast
// ================================


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









const stats =

role==="admin"

?

[


{


title:"Total Users",

value:adminStats?.totalUsers,

icon:<FaUsers/>,

color:"primary"


},



{


title:"Total Vendors",

value:adminStats?.totalVendors,

icon:<FaStore/>,

color:"success"


},



{


title:"Total Products",

value:adminStats?.totalProducts,

icon:<FaBox/>,

color:"warning"


},



{


title:"Total Orders",

value:adminStats?.totalOrders,

icon:<FaShoppingCart/>,

color:"danger"


},



{


title:"Revenue",

value:`₹ ${adminStats?.revenue || 0}`,

icon:<FaMoneyBillWave/>,

color:"info"


},



{


title:"Growth",

value:`${adminStats?.growth || 0}%`,

icon:<FaChartLine/>,

color:"dark"


}



]

:

[


{


title:"My Products",

value:vendorStats?.productCount,

icon:<FaBox/>,

color:"primary"


},



{


title:"My Orders",

value:vendorStats?.orders,

icon:<FaShoppingCart/>,

color:"success"


},



{


title:"Earnings",

value:`₹ ${vendorStats?.earnings || 0}`,

icon:<FaMoneyBillWave/>,

color:"warning"


}



];








return (


<div

className="
row
"

>


{


stats.map(

(item,index)=>(



<DashboardCard


key={index}


title={item.title}


value={item.value}


icon={item.icon}


bgClass={item.color}


/>



)


)


}



</div>


);


};



export default DashboardStats;