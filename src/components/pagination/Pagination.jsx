import React from "react";


import {
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";





const Pagination = ({

    currentPage = 1,

    totalPages = 1,

    onPageChange

}) => {





if(totalPages <= 1){

    return null;

}







// ===============================
// Generate Pages
// ===============================


const generatePages = () => {


const pages=[];



if(totalPages <= 5){


for(let i=1;i<=totalPages;i++){


pages.push(i);


}


}

else{


pages.push(1);



if(currentPage > 3){


pages.push("...");


}



let start=Math.max(

2,

currentPage-1

);



let end=Math.min(

totalPages-1,

currentPage+1

);



for(

let i=start;

i<=end;

i++

){


pages.push(i);


}





if(currentPage < totalPages-2){


pages.push("...");


}



pages.push(totalPages);



}



return pages;


};







const pages = generatePages();









return (


<nav

aria-label="Page navigation"

>


<ul

className="
pagination
justify-content-center
mt-4
"

>





{/* Previous */}


<li

className={

`page-item 

${

currentPage===1

?

"disabled"

:

""

}`

}

>


<button


className="
page-link
"

disabled={currentPage===1}


onClick={()=>


onPageChange(currentPage-1)

}


>



<FaChevronLeft/>

</button>



</li>









{/* Pages */}


{


pages.map(

(page,index)=>


(


<li


key={index}


className={

`page-item 

${

page===currentPage

?

"active"

:

""

}`

}



>


{


page==="..." ?



<button


className="
page-link
"

disabled


>

...

</button>




:




<button


className="
page-link
"


onClick={()=>onPageChange(page)}


>


{page}


</button>



}



</li>



)


)



}








{/* Next */}


<li


className={

`page-item

${

currentPage===totalPages

?

"disabled"

:

""

}`

}


>



<button


className="
page-link
"


disabled={

currentPage===totalPages

}


onClick={()=>


onPageChange(currentPage+1)

}



>



<FaChevronRight/>


</button>


</li>







</ul>


</nav>


);


};



export default Pagination;
