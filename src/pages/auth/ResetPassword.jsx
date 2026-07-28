import React, {
    useState
} from "react";

import {
    useNavigate,
    useParams,
    Link
} from "react-router-dom";

import {
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import {
    toast
} from "react-toastify";

import axiosInstance from "../../api/axios";

const ResetPassword = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({

        password: "",

        confirmPassword: ""

    });





    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };





    const validateForm = () => {

        if (!formData.password.trim()) {

            toast.error("Password is required");

            return false;

        }

        if (formData.password.length < 6) {

            toast.error("Password must be at least 6 characters");

            return false;

        }

        if (formData.password !== formData.confirmPassword) {

            toast.error("Passwords do not match");

            return false;

        }

        return true;

    };





    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validateForm()) {

            return;

        }

        try {

            setLoading(true);

            const { data } = await axiosInstance.post(

                `/auth/resetPassword/${token}`,

                {

                    password: formData.password

                }

            );

            toast.success(

                data.message ||

                "Password reset successfully"

            );

            navigate("/login");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Password reset failed"

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

                            <h2 className="text-center fw-bold mb-4">

                                Reset Password

                            </h2>

                            <form onSubmit={handleSubmit}>

                                <div className="mb-3">

                                    <label className="form-label">

                                        New Password

                                    </label>

                                    <div className="input-group">

                                        <input

                                            type={

                                                showPassword

                                                    ?

                                                    "text"

                                                    :

                                                    "password"

                                            }

                                            className="form-control"

                                            name="password"

                                            value={formData.password}

                                            onChange={handleChange}

                                        />

                                        <button

                                            type="button"

                                            className="btn btn-outline-secondary"

                                            onClick={() =>

                                                setShowPassword(

                                                    !showPassword

                                                )

                                            }

                                        >

                                            {

                                                showPassword

                                                    ?

                                                    <FaEyeSlash />

                                                    :

                                                    <FaEye />

                                            }

                                        </button>

                                    </div>

                                </div>





                                <div className="mb-4">

                                    <label className="form-label">

                                        Confirm Password

                                    </label>

                                    <div className="input-group">

                                        <input

                                            type={

                                                showConfirmPassword

                                                    ?

                                                    "text"

                                                    :

                                                    "password"

                                            }

                                            className="form-control"

                                            name="confirmPassword"

                                            value={formData.confirmPassword}

                                            onChange={handleChange}

                                        />

                                        <button

                                            type="button"

                                            className="btn btn-outline-secondary"

                                            onClick={() =>

                                                setShowConfirmPassword(

                                                    !showConfirmPassword

                                                )

                                            }

                                        >

                                            {

                                                showConfirmPassword

                                                    ?

                                                    <FaEyeSlash />

                                                    :

                                                    <FaEye />

                                            }

                                        </button>

                                    </div>

                                </div>





                                <button

                                    type="submit"

                                    className="btn btn-primary w-100"

                                    disabled={loading}

                                >

                                    {

                                        loading

                                            ?

                                            "Updating..."

                                            :

                                            "Reset Password"

                                    }

                                </button>

                            </form>





                            <div className="text-center mt-4">

                                <Link to="/login">

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

export default ResetPassword;