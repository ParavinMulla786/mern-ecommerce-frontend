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
    FaUserShield,
    FaUserSlash,
    FaSearch
} from "react-icons/fa";


import {
    toast
} from "react-toastify";



import {
    getAllUsers,
    updateUserRole,
    updateUserStatus,
    deleteUser
} from "../../redux/userSlice";



import Loader from "../../components/common/Loader";

import ErrorMessage from "../../components/common/ErrorMessage";

import Pagination from "../../components/pagination/Pagination";









const Users = () => {


    const dispatch = useDispatch();




    const {

        users,
        loading,
        error,
        pagination

    } = useSelector(
        state=>state.user
    );







    const [search,setSearch] = useState("");

    const [page,setPage] = useState(1);










    useEffect(()=>{


        dispatch(

            getAllUsers({

                page,

                search

            })

        );


    },[
        dispatch,
        page,
        search
    ]);









    const handleRoleChange=(id,role)=>{


        dispatch(

            updateUserRole({

                id,

                role

            })

        )
        .unwrap()

        .then(()=>{


            toast.success(
                "Role updated successfully"
            );


        })

        .catch(err=>{


            toast.error(
                err ||
                "Role update failed"
            );


        });



    };









    const handleStatus=(id)=>{


        dispatch(

            updateUserStatus(
                id
            )

        )
        .unwrap()

        .then(()=>{


            toast.success(
                "Status updated"
            );


        })

        .catch(err=>{


            toast.error(
                err
            );


        });


    };









    const handleDelete=(id)=>{


        if(
            !window.confirm(
                "Delete this user?"
            )
        )
        {
            return;
        }




        dispatch(

            deleteUser(id)

        )

        .unwrap()

        .then(()=>{


            toast.success(
                "User deleted"
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

                    Manage Users

                </h1>


                <p className="text-muted">

                    View and manage customer/vendor accounts

                </p>


            </div>








            {/* SEARCH */}



            <div className="card border-0 shadow-sm mb-4">


                <div className="card-body">


                    <div className="input-group">


                        <span className="input-group-text">


                            <FaSearch/>


                        </span>



                        <input

                            type="text"

                            className="form-control"

                            placeholder="Search users..."

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









            {/* USERS TABLE */}




            <div className="card border-0 shadow-sm">


                <div className="card-body">


                    <div className="table-responsive">



                        <table className="table align-middle">


                            <thead className="table-light">


                                <tr>


                                    <th>
                                        Name
                                    </th>


                                    <th>
                                        Email
                                    </th>


                                    <th>
                                        Role
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

                            users?.map(user=>(



                                <tr

                                key={
                                    user._id
                                }

                                >




                                    <td>


                                        {user.name}


                                    </td>





                                    <td>


                                        {user.email}


                                    </td>






                                    <td>


                                        <select

                                        className="
                                        form-select
                                        "

                                        value={
                                            user.role
                                        }


                                        onChange={(e)=>

                                            handleRoleChange(

                                                user._id,

                                                e.target.value

                                            )

                                        }


                                        >


                                            <option value="customer">

                                                Customer

                                            </option>



                                            <option value="vendor">

                                                Vendor

                                            </option>



                                            <option value="admin">

                                                Admin

                                            </option>


                                        </select>



                                    </td>








                                    <td>


                                        <button

                                        className={

                                        user.isActive

                                        ?

                                        "btn btn-success btn-sm"

                                        :

                                        "btn btn-secondary btn-sm"

                                        }


                                        onClick={()=>


                                            handleStatus(
                                                user._id
                                            )

                                        }


                                        >


                                        {

                                        user.isActive

                                        ?

                                        "Active"

                                        :

                                        "Inactive"

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
                                                user._id
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









            {/* PAGINATION */}



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



export default Users;