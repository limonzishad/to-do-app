import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    let errorMessage;
    let loadingMessage;

    if (error) {
        errorMessage = <div>
            <p className="text-danger text-center">Error: {error.message}</p>
        </div>
    }

    if (loading) {
        loadingMessage = <p className="text-info text-center">Loading...</p>;
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    return (
        <div>
            <div className="d-flex align-items-center justify-content-center">
                <div style={{ height: "1px" }} className="bg-secondary w-50"></div>
                <p className="mt-3 mx-2">OR</p>
                <div style={{ height: "1px" }} className="bg-secondary w-50"></div>
            </div>
            {errorMessage}
            {loadingMessage}
            <div className="text-center mb-5">
                <Button onClick={() => { signInWithGoogle() }} className="w-100">
                    <span>Sign in With &nbsp;</span>
                    <img style={{ width: "25px", height: "25px", borderRadius: "50px" }} src="https://image.similarpng.com/very-thumbnail/2020/12/Colorful-google-logo-design-on-transparent-PNG-1.png" alt="google logo" />
                </Button>
            </div>
        </div>
    );
};

export default SocialLogin;