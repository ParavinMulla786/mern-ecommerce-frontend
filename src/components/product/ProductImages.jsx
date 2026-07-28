import React, {
    useState
} from "react";



import {
    FaImage
} from "react-icons/fa";





const ProductImages = ({

    images=[],

    productName="Product"

}) => {



const [activeImage,setActiveImage] = useState(0);





const productImages =

images.length > 0

?

images

:

[

"/images/product-placeholder.png"

];







return (


<div className="container-fluid">





{/* Main Image */}


<div

className="
card
border-0
shadow-sm
mb-3
"

>


<img


src={productImages[activeImage]}


alt={productName}


className="
card-img-top
rounded
"

style={{

height:"450px",

objectFit:"contain",

cursor:"zoom-in"

}}


/>


</div>









{/* Thumbnail Gallery */}



<div

className="
row
g-3
"

>


{


productImages.map(

(image,index)=>(



<div


key={index}


className="
col-3
col-md-2
"


>


<button


className={

`

btn

p-0

border

w-100

${

activeImage===index

?

"border-primary border-3"

:

""

}

`

}


onClick={()=>setActiveImage(index)}


>


<img


src={image}


alt={`${productName}-${index}`}


className="
img-fluid
rounded
"

style={{

height:"80px",

width:"100%",

objectFit:"cover"

}}


/>


</button>




</div>


)


)



}



</div>









{


productImages.length===0 &&


<div

className="
text-center
text-muted
"

>


<FaImage/>

No Images Available


</div>


}





</div>


);


};



export default ProductImages;