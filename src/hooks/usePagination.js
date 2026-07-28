/* =====================================================
   USE PAGINATION HOOK
   Reusable Pagination Logic
===================================================== */


import {
    useState,
    useMemo
} from "react";





const usePagination = (


    totalItems = 0,


    itemsPerPage = 10,


    initialPage = 1



) => {



    const [

        currentPage,

        setCurrentPage

    ] = useState(initialPage);








    /* =====================================================
       Total Pages
    ===================================================== */


    const totalPages = useMemo(() => {


        return Math.ceil(

            totalItems /

            itemsPerPage

        );


    }, [

        totalItems,

        itemsPerPage

    ]);








    /* =====================================================
       Change Page
    ===================================================== */


    const changePage = (

        page

    ) => {



        if(

            page < 1 ||

            page > totalPages

        ){

            return;

        }



        setCurrentPage(

            page

        );


    };









    /* =====================================================
       Next Page
    ===================================================== */


    const nextPage = () => {


        if(

            currentPage < totalPages

        ){


            setCurrentPage(

                currentPage + 1

            );


        }


    };









    /* =====================================================
       Previous Page
    ===================================================== */


    const previousPage = () => {


        if(

            currentPage > 1

        ){


            setCurrentPage(

                currentPage - 1

            );


        }


    };









    /* =====================================================
       Reset Pagination
    ===================================================== */


    const resetPage = () => {


        setCurrentPage(

            1

        );


    };









    /* =====================================================
       First Page
    ===================================================== */


    const goFirst = () => {


        setCurrentPage(

            1

        );


    };









    /* =====================================================
       Last Page
    ===================================================== */


    const goLast = () => {


        setCurrentPage(

            totalPages

        );


    };









    /* =====================================================
       API Pagination Params
    ===================================================== */


    const paginationParams = {


        page:
            currentPage,


        limit:
            itemsPerPage,


        skip:
            (

                currentPage - 1

            )

            *

            itemsPerPage,


    };









    return {


        currentPage,


        totalPages,


        itemsPerPage,


        changePage,


        nextPage,


        previousPage,


        resetPage,


        goFirst,


        goLast,


        paginationParams,


        hasNextPage:

            currentPage < totalPages,



        hasPreviousPage:

            currentPage > 1,


    };




};





export default usePagination;