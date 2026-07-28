import React, {
    useState
} from "react";


import {
    FaPaperPlane
} from "react-icons/fa";


import {
    toast
} from "react-toastify";









const Newsletter = () => {


    const [
        email,
        setEmail
    ] = useState("");








    const handleSubmit=(e)=>{


        e.preventDefault();







        if(
            !email
        )
        {

            toast.error(
                "Enter email address"
            );


            return;

        }








        const emailRegex =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;







        if(
            !emailRegex.test(email)
        )
        {

            toast.error(
                "Enter valid email"
            );


            return;

        }









        /*
        
        API Integration Ready

        POST
        /api/newsletter/subscribe


        {

          email

        }


        */








        toast.success(
            "Subscribed successfully"
        );



        setEmail("");



    };









    return (

<div className="
mt-4
">


<h5 className="fw-bold">

Subscribe Newsletter

</h5>



<p className="
text-light
opacity-75
">

Get latest offers and updates

</p>







<form

onSubmit={handleSubmit}

className="
d-flex
"


>


<input


type="email"


className="
form-control
"


placeholder="
Enter your email
"


value={email}


onChange={(e)=>

setEmail(
e.target.value
)

}


/>






<button


className="
btn
btn-primary
"


type="submit"


>


<FaPaperPlane/>


</button>







</form>





</div>

    );

};



export default Newsletter;