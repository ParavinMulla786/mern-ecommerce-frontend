import React, {
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    useNavigate
} from "react-router-dom";


import {
    toast
} from "react-toastify";


import {
    FaArrowLeft,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";



import {
    changePassword
} from "../../redux/authSlice";



import Loader from "../../components/common/Loader";









const ChangePassword = () => {



    const dispatch = useDispatch();

    const navigate = useNavigate();





    const {

        loading,
        error

    } = useSelector(
        state=>state.auth
    );









    const [formData,setFormData] = useState({

        oldPassword:"",

        newPassword:"",

        confirmPassword:""

    });







    const [showPassword,setShowPassword] =
    useState({

        old:false,

        new:false,

        confirm:false

    });









    const handleChange=(e)=>{


        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });


    };









    const togglePassword=(field)=>{


        setShowPassword({

            ...showPassword,

            [field]:
            !showPassword[field]

        });


    };









    const validate=()=>{


        if(
            formData.oldPassword.trim()==="" ||
            formData.newPassword.trim()==="" ||
            formData.confirmPassword.trim()===""
        )
        {


            toast.error(
                "All fields are required"
            );


            return false;

        }






        if(
            formData.newPassword.length < 6
        )
        {

            toast.error(
                "Password must be at least 6 characters"
            );


            return false;

        }






        if(
            formData.newPassword !==
            formData.confirmPassword
        )
        {

            toast.error(
                "Passwords do not match"
            );


            return false;

        }



        return true;


    };









    const handleSubmit=(e)=>{


        e.preventDefault();




        if(!validate())
        {
            return;
        }






        dispatch(

            changePassword({

                oldPassword:
                formData.oldPassword,


                newPassword:
                formData.newPassword

            })

        )
        .unwrap()

        .then(()=>{


            toast.success(
                "Password changed successfully"
            );



            navigate(
                "/profile"
            );



        })


        .catch((err)=>{


            toast.error(

                err ||
                "Password change failed"

            );


        });



    };









    if(loading)
    {

        return <Loader/>

    }









    return (


        <div className="container">





            <button

                className="
                btn
                btn-outline-secondary
                mb-4
                "

                onClick={()=>navigate(-1)}

            >

                <FaArrowLeft/>

                {" "}

                Back


            </button>









            <div className="row justify-content-center">



                <div className="col-lg-6">





                    <div className="card shadow-sm border-0">


                        <div className="card-body p-4">






                            <div className="text-center mb-4">


                                <FaLock

                                    size={45}

                                    className="text-primary"

                                />



                                <h2 className="fw-bold mt-3">

                                    Change Password

                                </h2>



                                <p className="text-muted">

                                    Update your account password

                                </p>


                            </div>









                            <form

                                onSubmit={handleSubmit}

                            >









                            {/* OLD PASSWORD */}



                            <div className="mb-3">


                                <label className="form-label">

                                    Current Password

                                </label>



                                <div className="input-group">


                                    <input


                                        type={

                                            showPassword.old

                                            ?

                                            "text"

                                            :

                                            "password"

                                        }


                                        className="form-control"


                                        name="oldPassword"


                                        value={
                                            formData.oldPassword
                                        }


                                        onChange={
                                            handleChange
                                        }


                                    />




                                    <button

                                        type="button"

                                        className="
                                        btn
                                        btn-outline-secondary
                                        "

                                        onClick={()=>

                                            togglePassword(
                                                "old"
                                            )

                                        }

                                    >


                                        {

                                        showPassword.old

                                        ?

                                        <FaEyeSlash/>

                                        :

                                        <FaEye/>

                                        }


                                    </button>



                                </div>



                            </div>












                            {/* NEW PASSWORD */}




                            <div className="mb-3">


                                <label className="form-label">

                                    New Password

                                </label>



                                <div className="input-group">


                                    <input


                                        type={

                                            showPassword.new

                                            ?

                                            "text"

                                            :

                                            "password"

                                        }


                                        className="form-control"


                                        name="newPassword"


                                        value={
                                            formData.newPassword
                                        }


                                        onChange={
                                            handleChange
                                        }


                                    />




                                    <button

                                        type="button"

                                        className="
                                        btn
                                        btn-outline-secondary
                                        "

                                        onClick={()=>


                                            togglePassword(
                                                "new"
                                            )


                                        }

                                    >


                                        {

                                        showPassword.new

                                        ?

                                        <FaEyeSlash/>

                                        :

                                        <FaEye/>

                                        }


                                    </button>



                                </div>



                            </div>












                            {/* CONFIRM PASSWORD */}





                            <div className="mb-4">


                                <label className="form-label">

                                    Confirm Password

                                </label>



                                <div className="input-group">


                                    <input


                                        type={

                                            showPassword.confirm

                                            ?

                                            "text"

                                            :

                                            "password"

                                        }


                                        className="form-control"


                                        name="confirmPassword"


                                        value={
                                            formData.confirmPassword
                                        }


                                        onChange={
                                            handleChange
                                        }


                                    />




                                    <button

                                        type="button"

                                        className="
                                        btn
                                        btn-outline-secondary
                                        "

                                        onClick={()=>


                                            togglePassword(
                                                "confirm"
                                            )


                                        }

                                    >


                                        {

                                        showPassword.confirm

                                        ?

                                        <FaEyeSlash/>

                                        :

                                        <FaEye/>

                                        }


                                    </button>



                                </div>



                            </div>









                            {

                            error &&

                            <div className="alert alert-danger">

                                {error}

                            </div>

                            }









                            <button

                                type="submit"

                                className="
                                btn
                                btn-primary
                                w-100
                                "

                            >

                                <FaLock/>

                                {" "}

                                Update Password


                            </button>







                            </form>







                        </div>


                    </div>







                </div>



            </div>







        </div>

    );

};



export default ChangePassword;
