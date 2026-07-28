import React, {
    useEffect
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    FaHome,
    FaArrowLeft,
    FaLock,
    FaSignInAlt
} from "react-icons/fa";

const Unauthorized = () => {

    const navigate = useNavigate();

    useEffect(() => {

        document.title = "403 | Unauthorized";

    }, []);

    return (

        <div
            className="
                container
                d-flex
                align-items-center
                justify-content-center
                min-vh-100
            "
        >

            <div
                className="
                    text-center
                    p-5
                "
            >

                <FaLock
                    size={80}
                    className="text-danger mb-4"
                />

                <h1
                    className="
                        display-1
                        fw-bold
                        text-danger
                    "
                >

                    403

                </h1>

                <h3
                    className="
                        fw-bold
                        mb-3
                    "
                >

                    Access Denied

                </h3>

                <p
                    className="
                        text-muted
                        mb-4
                    "
                >

                    You do not have permission to access this page.
                    Please login with an authorized account or contact the administrator.

                </p>

                <div
                    className="
                        d-flex
                        justify-content-center
                        flex-wrap
                        gap-3
                    "
                >

                    <button
                        className="btn btn-secondary"
                        onClick={() => navigate(-1)}
                    >

                        <FaArrowLeft className="me-2" />

                        Go Back

                    </button>

                    <Link
                        to="/"
                        className="btn btn-primary"
                    >

                        <FaHome className="me-2" />

                        Home

                    </Link>

                    <Link
                        to="/login"
                        className="btn btn-success"
                    >

                        <FaSignInAlt className="me-2" />

                        Login

                    </Link>

                </div>

            </div>

        </div>

    );

};

export default Unauthorized;