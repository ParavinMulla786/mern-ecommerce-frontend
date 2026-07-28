import React, { useState } from "react";


const SearchBar = ({

    value,

    onChange,

    onSearch,

    placeholder="Search products...",


}) => {



const [search,setSearch] = useState(value || "");




const handleChange=(e)=>{


    setSearch(e.target.value);


    if(onChange){

        onChange(e.target.value);

    }


};





const handleSubmit=(e)=>{


    e.preventDefault();


    if(onSearch){

        onSearch(search);

    }


};






const clearSearch=()=>{


    setSearch("");


    if(onChange){

        onChange("");

    }


};




return (


<form

onSubmit={handleSubmit}

className="
relative
w-full
"


>


<input


type="text"


value={search}


onChange={handleChange}


placeholder={placeholder}


className="
w-full
px-5
py-3
pr-20
rounded-lg
border
border-gray-300
focus:outline-none
focus:border-blue-500
"


/>






{


search &&


<button


type="button"


onClick={clearSearch}


className="
absolute
right-12
top-3
text-gray-500
"

>

✕

</button>


}






<button


type="submit"


className="
absolute
right-3
top-2.5
text-xl
"

>

🔍

</button>



</form>


);


};



export default SearchBar;