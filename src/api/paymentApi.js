import axiosInstance from "./axios";

/*
=========================================
Create Payment Intent
POST /api/payments/create-payment-intent
=========================================
*/

export const createPaymentIntentApi = async (paymentData) => {

    const response = await axiosInstance.post(
        "/payments/create-payment-intent",
        paymentData
    );

    return response.data;

};

/*
=========================================
Create Razorpay Order
POST /api/payments/create-order
=========================================
*/

export const createPaymentOrderApi = async (orderData) => {

    const response = await axiosInstance.post(
        "/payments/create-order",
        orderData
    );

    return response.data;

};

/*
=========================================
Verify Payment
POST /api/payments/verify
=========================================
*/

export const verifyPaymentApi = async (paymentData) => {

    const response = await axiosInstance.post(
        "/payments/verify",
        paymentData
    );

    return response.data;

};

/*
=========================================
Get Payment Status
GET /api/payments/status/:id
=========================================
*/

export const getPaymentStatusApi = async (paymentId) => {

    const response = await axiosInstance.get(
        `/payments/status/${paymentId}`
    );

    return response.data;

};

/*
=========================================
Get Payment History
GET /api/payments/history
=========================================
*/

export const getPaymentHistoryApi = async (params = {}) => {

    const response = await axiosInstance.get(
        "/payments/history",
        {
            params,
        }
    );

    return response.data;

};

/*
=========================================
Refund Payment
POST /api/payments/refund/:id
=========================================
*/

export const refundPaymentApi = async (
    paymentId,
    refundData = {}
) => {

    const response = await axiosInstance.post(
        `/payments/refund/${paymentId}`,
        refundData
    );

    return response.data;

};