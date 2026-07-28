import React, {
    useEffect,
    useState
} from "react";


import {
    useDispatch,
    useSelector
} from "react-redux";


import {
    FaTrash,
    FaCheckCircle,
    FaBan,
    FaSearch,
    FaStore
} from "react-icons/fa";


import {
    toast
} from "react-toastify";



import {
    getAllUsers,
    updateUserStatus,
    deleteUser
} from "../../redux/userSlice";



import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";

import Pagination from "../../components/pagination/Pagination";









const Vendors = () => {


    const dispatch = useDispatch();




    const {

        users,
        loading,
        error,
        pagination

    } = useSelector(
        state=>state.user
    );







    const [search,setSearch] =
    useState("");



    const [page,setPage] =
    useState(1);










    useEffect(()=>{


        dispatch(

            getAllUsers({

                role:"vendor",

                page,

                search

            })

        );


    },[
        dispatch,
        page,
        search
    ]);









    const vendors =

        users?.filter(

            user=>

            user.role==="vendor"

        );









    const handleStatus=(id)=>{


        dispatch(

            updateUserStatus(id)

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Vendor status updated"
            );


        })

        .catch(err=>{


            toast.error(
                err ||
                "Status update failed"
            );


        });


    };









    const handleDelete=(id)=>{


        const confirmDelete =
        window.confirm(
            "Delete vendor?"
        );



        if(!confirmDelete)
        {
            return;
        }




        dispatch(

            deleteUser(id)

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "Vendor removed"
            );


        })

        .catch(err=>{


            toast.error(
                err
            );


        });



    };









    if(loading)
    {

        return <Loader/>

    }







    if(error)
    {

        return (

            <ErrorMessage

                message={error}

            />

        );

    }










    return (

        <div>





            <div className="mb-4">


                <h1 className="fw-bold">

                    <FaStore/>

                    {" "}

                    Manage Vendors

                </h1>


                <p className="text-muted">

                    Approve and manage sellers

                </p>


            </div>









            {/* SEARCH */}



            <div className="
            card
            border-0
            shadow-sm
            mb-4
            ">


                <div className="card-body">


                    <div className="input-group">


                        <span className="input-group-text">

                            <FaSearch/>

                        </span>



                        <input

                            type="text"

                            className="form-control"

                            placeholder="Search vendors..."

                            value={search}

                            onChange={(e)=>

                                setSearch(
                                    e.target.value
                                )

                            }

                        />



                    </div>



                </div>


            </div>









            {/* TABLE */}



            <div className="
            card
            shadow-sm
            border-0
            ">


                <div className="card-body">


                    <div className="table-responsive">


                        <table className="table align-middle">


                            <thead className="table-light">


                                <tr>


                                    <th>
                                        Vendor
                                    </th>


                                    <th>
                                        Email
                                    </th>


                                    <th>
                                        Products
                                    </th>


                                    <th>
                                        Status
                                    </th>


                                    <th>
                                        Actions
                                    </th>


                                </tr>


                            </thead>





                            <tbody>


                            {


                            vendors?.map(vendor=>(



                                <tr

                                key={
                                    vendor._id
                                }

                                >




                                    <td>


                                        <div className="d-flex align-items-center">


                                            <img

                                            src={

                                            vendor.profileImage

                                            ||

                                            "/images/avatar.png"

                                            }

                                            width="45"

                                            height="45"

                                            className="
                                            rounded-circle
                                            me-2
                                            "

                                            alt="vendor"

                                            />


                                            <strong>

                                                {
                                                vendor.name
                                                }

                                            </strong>


                                        </div>


                                    </td>








                                    <td>


                                        {
                                        vendor.email
                                        }


                                    </td>







                                    <td>


                                        {

                                        vendor.productsCount

                                        ||

                                        0

                                        }


                                    </td>








                                    <td>



                                        <button

                                        className={

                                        vendor.isActive

                                        ?

                                        "btn btn-success btn-sm"

                                        :

                                        "btn btn-danger btn-sm"

                                        }


                                        onClick={()=>


                                            handleStatus(
                                                vendor._id
                                            )


                                        }


                                        >



                                        {

                                        vendor.isActive

                                        ?

                                        <>

                                        <FaCheckCircle/>

                                        {" "}
                                        Active

                                        </>

                                        :

                                        <>

                                        <FaBan/>

                                        {" "}
                                        Blocked

                                        </>


                                        }



                                        </button>



                                    </td>









                                    <td>


                                        <button

                                        className="
                                        btn
                                        btn-danger
                                        btn-sm
                                        "

                                        onClick={()=>


                                            handleDelete(
                                                vendor._id
                                            )


                                        }

                                        >


                                            <FaTrash/>


                                        </button>


                                    </td>





                                </tr>



                            ))

                            }





                            </tbody>



                        </table>



                    </div>


                </div>


            </div>









            {

            pagination &&


            <Pagination

                currentPage={
                    page
                }

                totalPages={
                    pagination.totalPages
                }

                onPageChange={
                    setPage
                }


            />


            }





        </div>

    );

};



export default Vendors;