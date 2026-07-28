import React, { useState } from "react";

import { 
    FaSearch,
    FaTimes
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";



const SearchBar = () => {


    const [keyword,setKeyword] = useState("");

    const navigate = useNavigate();





    const handleSearch=(e)=>{


        e.preventDefault();



        if(!keyword.trim()){


            toast.warning(
                "Please enter product name"
            );


            return;


        }



        navigate(

            `/search?keyword=${keyword}`

        );


        setKeyword("");

    };







return (

<form

onSubmit={handleSearch}

className="
d-flex
"

>


<div

className="
input-group
"

>


<span

className="
input-group-text
bg-white
"

>

<FaSearch/>

</span>





<input


type="text"


className="
form-control
"

placeholder="Search products..."


value={keyword}


onChange={(e)=>

setKeyword(e.target.value)

}


/>




{


keyword &&


<button


type="button"


className="
btn
btn-outline-secondary
"


onClick={()=>setKeyword("")}


>


<FaTimes/>


</button>


}




<button


className="
btn
btn-primary
"


type="submit"


>


Search


</button>




</div>



</form>

);


};


export default SearchBar;