/* =====================================================
   USE DEBOUNCE HOOK
   Delay Function Execution
===================================================== */


import {
    useState,
    useEffect
} from "react";





const useDebounce = (

    value,

    delay = 500

) => {


    const [
        debouncedValue,

        setDebouncedValue

    ] = useState(value);





    useEffect(() => {



        const timer = setTimeout(() => {


            setDebouncedValue(

                value

            );


        }, delay);





        // Cleanup Previous Timer

        return () => {


            clearTimeout(

                timer

            );


        };



    }, [

        value,

        delay

    ]);






    return debouncedValue;


};




export default useDebounce;