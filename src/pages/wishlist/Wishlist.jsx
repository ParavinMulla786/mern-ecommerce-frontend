import React, { useEffect } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    Link
} from "react-router-dom";


import {
    FaHeart,
    FaShoppingCart,
    FaTrash
} from "react-icons/fa";


import {
    toast
} from "react-toastify";



import {
    getWishlist,
    removeWishlist
} from "../../redux/wishlistSlice";


import {
    addToCart
} from "../../redux/slices/cartSlice";



import Loader from "../../components/common/Loader";

import EmptyState from "../../components/common/EmptyState";







const Wishlist = () => {


    const dispatch = useDispatch();




    const {

        wishlistItems,
        loading

    } = useSelector(
        state => state.wishlist
    );







    useEffect(()=>{


        dispatch(
            getWishlist()
        );


    },[dispatch]);










    const handleRemove = (id)=>{


        dispatch(
            removeWishlist(id)
        );



        toast.success(
            "Removed from wishlist"
        );


    };









    const handleAddCart=(product)=>{


        dispatch(

            addToCart({

                productId:product._id,

                quantity:1

            })

        );



        toast.success(
            "Added to cart"
        );


    };









    if(loading)
    {
        return <Loader/>
    }








    return (

        <div>



            <div className="d-flex justify-content-between align-items-center mb-4">


                <h1 className="fw-bold">


                    <FaHeart className="text-danger"/>

                    {" "}

                    My Wishlist


                </h1>


            </div>








            {

            wishlistItems?.length === 0


            ?


            <EmptyState

                message="Your wishlist is empty"

            />



            :






            <div className="row g-4">



            {

            wishlistItems?.map((item)=>(


                <div

                    className="col-sm-6 col-md-4 col-lg-3"

                    key={item._id}

                >



                    <div className="card h-100 shadow-sm border-0">







                        {/* IMAGE */}



                        <Link

                            to={`/product/${item.product._id}`}

                        >


                            <img

                                src={

                                    item.product.images?.[0]

                                    ||

                                    "/images/product.png"

                                }


                                className="card-img-top p-3"

                                style={{

                                    height:"220px",

                                    objectFit:"contain"

                                }}


                                alt={
                                    item.product.name
                                }


                            />


                        </Link>








                        <div className="card-body">



                            <Link

                                to={`/product/${item.product._id}`}

                                className="
                                text-decoration-none
                                text-dark
                                "

                            >


                                <h5>

                                    {
                                    item.product.name
                                    }


                                </h5>


                            </Link>






                            <h5 className="text-primary">


                                ₹

                                {
                                item.product.price
                                }


                            </h5>









                            <div className="d-flex gap-2 mt-3">





                                <button

                                    className="
                                    btn
                                    btn-primary
                                    flex-grow-1
                                    "

                                    onClick={()=>


                                        handleAddCart(

                                            item.product

                                        )


                                    }

                                >


                                    <FaShoppingCart/>

                                    {" "}

                                    Cart


                                </button>








                                <button

                                    className="
                                    btn
                                    btn-danger
                                    "

                                    onClick={()=>


                                        handleRemove(

                                            item.product._id

                                        )


                                    }

                                >


                                    <FaTrash/>


                                </button>





                            </div>





                        </div>





                    </div>




                </div>



            ))

            }



            </div>


            }



        </div>

    );

};



export default Wishlist;