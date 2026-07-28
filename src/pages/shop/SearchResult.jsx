import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import {
    FaSearch
} from "react-icons/fa";


import {
    searchProducts,
    getProducts
} from "../../redux/productSlice";


import ProductGrid from "../../components/product/ProductGrid";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";





const SearchResult = () => {


    const dispatch = useDispatch();


    const [searchParams,setSearchParams] = useSearchParams();



    const keyword =
        searchParams.get("keyword") || "";



    const {

        products,
        loading,
        pagination

    } = useSelector(
        (state)=>state.product
    );



    const [search,setSearch] = useState(keyword);








    useEffect(()=>{


        if(keyword)
        {

            dispatch(
                searchProducts(keyword)
            );

        }
        else
        {

            dispatch(
                getProducts()
            );

        }


    },[dispatch,keyword]);









    const handleSearch=(e)=>{


        const value=e.target.value;


        setSearch(value);



        setSearchParams({

            keyword:value

        });



    };









    const handlePageChange=(page)=>{


        dispatch(

            searchProducts({

                keyword,

                page,

                limit:12

            })

        );


    };








    if(loading)
    {
        return <Loader/>
    }








    return (

        <div>


            {/* HEADER */}


            <div className="mb-4">


                <h1 className="fw-bold">

                    Search Results

                </h1>



                {

                    keyword &&

                    <p className="text-muted">

                        Showing results for:

                        <strong>
                            {" "}
                            {keyword}
                        </strong>


                    </p>

                }



            </div>










            {/* SEARCH BOX */}


            <div className="input-group mb-4">


                <span className="input-group-text">

                    <FaSearch/>

                </span>



                <input

                    type="text"

                    className="form-control"

                    placeholder="Search products..."

                    value={search}

                    onChange={handleSearch}

                />


            </div>









            {/* RESULTS */}



            {

                products?.length > 0

                ?


                <>


                <div className="mb-3">


                    <h5>

                        {products.length}

                        {" "}
                        Products Found

                    </h5>


                </div>





                <ProductGrid

                    products={products}

                    pagination={pagination}

                    onPageChange={handlePageChange}

                />



                </>


                :


                <EmptyState

                    message={`No products found for "${keyword}"`}

                />


            }







        </div>

    );

};



export default SearchResult;