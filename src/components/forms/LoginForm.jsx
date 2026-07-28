import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { login } from "../../redux/authSlice";

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const validate = () => {

        if (!formData.email.trim()) {

            toast.error("Email is required");
            return false;

        }

        if (!/\S+@\S+\.\S+/.test(formData.email)) {

            toast.error("Enter a valid email");
            return false;

        }

        if (!formData.password.trim()) {

            toast.error("Password is required");
            return false;

        }

        return true;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) {
            return;
        }

        try {

            await dispatch(
                login(formData)
            ).unwrap();

            toast.success("Login successful");

            navigate("/");

        } catch (error) {

            toast.error(
                error || "Login failed"
            );

        }

    };

    return (

        <div className="card shadow border-0">

            <div className="card-body p-4">

                <h2 className="text-center fw-bold mb-4">
                    Login
                </h2>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">
                            Password
                        </label>

                        <div className="input-group">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                name="password"
                                className="form-control"
                                placeholder="Enter password"
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
                                        ? <FaEyeSlash />
                                        : <FaEye />
                                }
                            </button>

                        </div>

                    </div>

                    <div className="d-flex justify-content-between mb-3">

                        <div className="form-check">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="remember"
                            />

                            <label
                                className="form-check-label"
                                htmlFor="remember"
                            >
                                Remember Me
                            </label>

                        </div>

                        <Link
                            to="/forgot-password"
                            className="text-decoration-none"
                        >
                            Forgot Password?
                        </Link>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={loading}
                    >

                        {
                            loading
                                ? "Signing In..."
                                : "Login"
                        }

                    </button>

                </form>

                <div className="text-center mt-4">

                    Don't have an account?{" "}

                    <Link
                        to="/register"
                        className="text-decoration-none"
                    >
                        Register
                    </Link>

                </div>

            </div>

        </div>

    );

};

export default LoginForm;