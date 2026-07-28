import React, {
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    toast
} from "react-toastify";

import axiosInstance from "../../api/axios";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!email.trim()) {

            toast.error("Email is required");

            return;

        }

        try {

            setLoading(true);

            const { data } = await axiosInstance.post(

                "/auth/forgotPassword",

                {
                    email
                }

            );

            toast.success(

                data.message ||

                "Reset link sent successfully"

            );

            setEmail("");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed to send reset link"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="container py-5">

            <div className="row justify-content-center">

                <div className="col-md-6 col-lg-5">

                    <div className="card shadow border-0">

                        <div className="card-body p-4">

                            <h2 className="text-center fw-bold mb-3">

                                Forgot Password

                            </h2>

                            <p className="text-center text-muted mb-4">

                                Enter your registered email to receive a password reset link.

                            </p>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        Email Address

                                    </label>

                                    <input

                                        type="email"

                                        className="form-control"

                                        placeholder="Enter email"

                                        value={email}

                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }

                                    />

                                </div>

                                <button

                                    type="submit"

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                            ?

                                            "Sending..."

                                            :

                                            "Send Reset Link"

                                    }

                                </button>

                            </form>

                            <div className="text-center mt-4">

                                <Link

                                    to="/login"

                                >

                                    Back to Login

                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};

export default ForgotPassword;