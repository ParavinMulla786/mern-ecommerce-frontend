import React from "react";


import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaLinkedin
} from "react-icons/fa";









const SocialLinks = () => {



    const socialLinks=[


        {
            name:"Facebook",

            icon:<FaFacebook/>,

            url:"https://facebook.com"

        },


        {
            name:"Instagram",

            icon:<FaInstagram/>,

            url:"https://instagram.com"

        },


        {
            name:"Twitter",

            icon:<FaTwitter/>,

            url:"https://twitter.com"

        },


        {
            name:"Youtube",

            icon:<FaYoutube/>,

            url:"https://youtube.com"

        },


        {
            name:"LinkedIn",

            icon:<FaLinkedin/>,

            url:"https://linkedin.com"

        }


    ];









    return (

<div>


<h5 className="fw-bold">

Follow Us

</h5>






<div className="
d-flex
gap-3
">


{

socialLinks.map(
(item)=>(


<a


key={item.name}


href={item.url}


target="_blank"


rel="noreferrer"


className="
text-white
fs-4
"


title={item.name}


>


{

item.icon

}


</a>


)

)


}



</div>





</div>

    );

};



export default SocialLinks;