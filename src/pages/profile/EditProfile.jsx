import React, {
    useEffect,
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
    FaCamera,
    FaSave
} from "react-icons/fa";



import {
    getCurrentUser,
    updateProfile,
    uploadProfileImage
} from "../../redux/authSlice";



import Loader from "../../components/common/Loader";









const EditProfile = () => {


    const dispatch = useDispatch();

    const navigate = useNavigate();




    const {
        user,
        loading,
        error

    } = useSelector(
        state => state.auth
    );






    const [formData,setFormData] = useState({

        name:"",
        contactNumber:""

    });





    const [image,setImage] = useState(null);



    const [preview,setPreview] = useState("");









    useEffect(()=>{


        if(!user)
        {

            dispatch(
                getCurrentUser()
            );

        }


        else
        {


            setFormData({

                name:user.name || "",

                contactNumber:
                user.contactNumber || ""

            });


            setPreview(

                user.profileImage ||

                "/images/avatar.png"

            );


        }



    },[
        dispatch,
        user
    ]);









    const handleChange=(e)=>{


        setFormData({

            ...formData,

            [e.target.name]:
            e.target.value

        });


    };









    const handleImageChange=(e)=>{


        const file =
        e.target.files[0];



        if(file)
        {


            setImage(file);



            setPreview(
                URL.createObjectURL(file)
            );


        }


    };









    const handleSubmit=async(e)=>{


        e.preventDefault();



        try
        {



            await dispatch(

                updateProfile(
                    formData
                )

            )
            .unwrap();





            if(image)
            {


                const data =
                new FormData();


                data.append(
                    "profileImage",
                    image
                );



                await dispatch(

                    uploadProfileImage(
                        data
                    )

                )
                .unwrap();



            }






            toast.success(
                "Profile updated successfully"
            );



            navigate(
                "/profile"
            );





        }

        catch(err)
        {


            toast.error(

                err ||
                "Update failed"

            );


        }



    };









    if(loading || !user)
    {

        return <Loader/>;

    }









    return (

        <div className="container">






            <button

                className="
                btn
                btn-outline-secondary
                mb-4
                "

                onClick={()=>
                    navigate(-1)
                }

            >

                <FaArrowLeft/>

                {" "}

                Back

            </button>







            <div className="card shadow-sm border-0">


                <div className="card-body p-4">





                    <h2 className="fw-bold mb-4">

                        Edit Profile

                    </h2>








                    <form

                        onSubmit={handleSubmit}

                    >






                    {/* PROFILE IMAGE */}



                    <div className="
                    text-center
                    mb-4
                    ">



                        <div className="position-relative d-inline-block">



                            <img

                                src={preview}

                                alt="profile"

                                width="140"

                                height="140"

                                className="
                                rounded-circle
                                border
                                "

                                style={{

                                    objectFit:"cover"

                                }}

                            />





                            <label

                                htmlFor="imageUpload"

                                className="
                                btn
                                btn-primary
                                rounded-circle
                                position-absolute
                                bottom-0
                                end-0
                                "

                                style={{

                                    cursor:"pointer"

                                }}

                            >


                                <FaCamera/>


                            </label>



                            <input

                                id="imageUpload"

                                type="file"

                                accept="image/*"

                                hidden

                                onChange={
                                    handleImageChange
                                }

                            />




                        </div>



                    </div>









                    <div className="mb-3">


                        <label className="form-label">

                            Name

                        </label>



                        <input


                            type="text"

                            className="form-control"

                            name="name"

                            value={
                                formData.name
                            }

                            onChange={
                                handleChange
                            }


                        />


                    </div>









                    <div className="mb-3">


                        <label className="form-label">

                            Contact Number

                        </label>



                        <input


                            type="text"

                            className="form-control"

                            name="contactNumber"

                            value={
                                formData.contactNumber
                            }

                            onChange={
                                handleChange
                            }


                        />


                    </div>









                    <div className="mb-3">


                        <label className="form-label">

                            Email

                        </label>



                        <input


                            type="email"

                            className="form-control"

                            value={
                                user.email
                            }

                            disabled


                        />


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


                        <FaSave/>

                        {" "}

                        Save Changes


                    </button>








                    </form>





                </div>


            </div>





        </div>

    );

};



export default EditProfile;