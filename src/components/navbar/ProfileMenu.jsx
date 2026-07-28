import React, {
    useState
} from "react";


import {

    FaUser,
    FaSignOutAlt,
    FaUserCircle

} from "react-icons/fa";


import {
    Link,
    useNavigate
} from "react-router-dom";


import {
    useDispatch,
    useSelector
} from "react-redux";



import {
    toast
} from "react-toastify";



import {
    logout
} from "../../redux/authSlice";





const ProfileMenu = ()=>{


const dispatch = useDispatch();


const navigate = useNavigate();



const [open,setOpen]=useState(false);





const {

    user,

    isAuthenticated

}=useSelector(

(state)=>state.auth

);







const logoutHandler=()=>{


    dispatch(

        logout()

    );



    toast.success(

        "Logout successful"

    );


    navigate("/login");


};







if(!isAuthenticated){


return (


<Link

to="/login"

className="
btn
btn-outline-primary
d-flex
align-items-center
gap-2
"


>


<FaUser/>


Login


</Link>


);


}








return (

<div

className="
dropdown
"

>



<button

className="
btn
btn-light
dropdown-toggle
d-flex
align-items-center
gap-2
"


onClick={()=>setOpen(!open)}

>


<FaUserCircle

size={22}

/>


{

user?.name || "Account"

}


</button>








{

open &&


<ul

className="
dropdown-menu
show
position-absolute
end-0
"

>



<li>

<Link

className="
dropdown-item
d-flex
gap-2
align-items-center
"

to="/profile"

>


<FaUser/>

Profile


</Link>


</li>








{

user?.role==="admin" &&


<li>


<Link

className="dropdown-item"

to="/admin/dashboard"

>

Admin Dashboard

</Link>


</li>


}







{

user?.role==="vendor" &&


<li>


<Link

className="dropdown-item"

to="/vendor/dashboard"

>

Vendor Dashboard

</Link>


</li>


}








<li>


<button

className="
dropdown-item
text-danger
d-flex
gap-2
align-items-center
"

onClick={logoutHandler}


>


<FaSignOutAlt/>

Logout


</button>


</li>



</ul>


}




</div>


);


};



export default ProfileMenu;