/* =====================================================
   PRICE CALCULATION UTILITIES
===================================================== */





/* =====================================================
   Calculate Discount Amount
===================================================== */


export const calculateDiscount = (

    price,

    discountPercentage = 0

) => {


    if(

        !price ||

        discountPercentage <= 0

    ){

        return 0;

    }



    return (

        price *

        discountPercentage

        /

        100

    );


};









/* =====================================================
   Calculate Final Price After Discount
===================================================== */


export const calculateDiscountedPrice = (

    price,

    discountPercentage = 0

) => {


    const discount =

        calculateDiscount(

            price,

            discountPercentage

        );



    return Math.max(

        price - discount,

        0

    );


};









/* =====================================================
   Calculate Tax Amount
===================================================== */


export const calculateTax = (

    amount,

    taxPercentage = 18

) => {


    if(

        !amount ||

        taxPercentage <= 0

    ){

        return 0;

    }



    return (

        amount *

        taxPercentage

        /

        100

    );


};









/* =====================================================
   Calculate Shipping Charges
===================================================== */


export const calculateShipping = (

    subtotal,

    freeShippingLimit = 1000,

    shippingCharge = 50

) => {


    if(

        subtotal >= freeShippingLimit

    ){

        return 0;

    }



    return shippingCharge;


};









/* =====================================================
   Calculate Product Total
===================================================== */


export const calculateProductTotal = (

    price,

    quantity = 1

) => {


    return (

        Number(price)

        *

        Number(quantity)

    );


};









/* =====================================================
   Calculate Cart Subtotal
===================================================== */


export const calculateCartSubtotal = (

    cartItems = []

) => {


    return cartItems.reduce(

        (

            total,

            item

        ) => {


            return (

                total +

                (

                    item.price *

                    item.quantity

                )

            );


        },

        0

    );


};









/* =====================================================
   Calculate Cart Discount
===================================================== */


export const calculateCartDiscount = (

    cartItems = []

) => {


    return cartItems.reduce(

        (

            total,

            item

        ) => {


            const discount =

                calculateDiscount(

                    item.price,

                    item.discount || 0

                );



            return (

                total +

                (

                    discount *

                    item.quantity

                )

            );


        },

        0

    );


};









/* =====================================================
   Calculate Order Total
===================================================== */


export const calculateOrderTotal = ({


    subtotal = 0,


    discount = 0,


    tax = 0,


    shipping = 0



}) => {


    return Math.max(

        subtotal

        -

        discount

        +

        tax

        +

        shipping,


        0

    );


};









/* =====================================================
   Complete Price Breakdown
===================================================== */


export const calculatePriceBreakdown = ({


    items = [],


    taxPercentage = 18,


    freeShippingLimit = 1000,


    shippingCharge = 50



}) => {



    const subtotal =

        calculateCartSubtotal(

            items

        );




    const discount =

        calculateCartDiscount(

            items

        );




    const taxableAmount =

        subtotal -

        discount;




    const tax =

        calculateTax(

            taxableAmount,

            taxPercentage

        );




    const shipping =

        calculateShipping(

            taxableAmount,

            freeShippingLimit,

            shippingCharge

        );




    const total =

        calculateOrderTotal({

            subtotal,

            discount,

            tax,

            shipping

        });





    return {


        subtotal,


        discount,


        taxableAmount,


        tax,


        shipping,


        total



    };


};









/* =====================================================
   Format Price
===================================================== */


export const roundPrice = (

    amount

) => {


    return Number(

        Number(amount)

            .toFixed(2)

    );


};