import React, { useState } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import {
    toast
} from "react-toastify";

import {
    register
} from "../../redux/authSlice";

const RegisterForm = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        loading
    } = useSelector(
        state => state.auth
    );

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({

        name: "",

        email: "",

        contactNumber: "",

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

        if (!formData.name.trim()) {

            toast.error("Name is required");

            return false;

        }

        if (!formData.email.trim()) {

            toast.error("Email is required");

            return false;

        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {

            toast.error("Enter valid email");

            return false;

        }

        if (!/^\d{10}$/.test(formData.contactNumber)) {

            toast.error("Enter valid contact number");

            return false;

        }

        if (formData.password.length < 8) {

            toast.error("Password must be at least 8 characters");

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

            await dispatch(

                register({

                    name: formData.name,

                    email: formData.email,

                    password: formData.password,

                    contactNumber: formData.contactNumber

                })

            ).unwrap();

            toast.success("Registration successful");

            navigate("/login");

        }

        catch (error) {

            toast.error(

                error ||

                "Registration failed"

            );

        }

    };

    return (

        <div className="card shadow border-0">

            <div className="card-body p-4">

                <h2 className="text-center fw-bold mb-4">

                    Create Account

                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">

                            Full Name

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Email

                        </label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Contact Number

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Password

                        </label>

                        <div className="input-group">

                            <input
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    setShowPassword(!showPassword)
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
                                type={showConfirmPassword ? "text" : "password"}
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
                        className="btn btn-success w-100"
                        disabled={loading}
                    >

                        {
                            loading

                                ?

                                "Creating Account..."

                                :

                                "Register"
                        }

                    </button>

                </form>

                <div className="text-center mt-4">

                    Already have an account?

                    {" "}

                    <Link
                        to="/login"
                        className="text-decoration-none"
                    >

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default RegisterForm;