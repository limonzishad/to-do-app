import React, { useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification } from 'react-firebase-hooks/auth';
import auth from "../../../firebase.init";
import SocialLogin from '../SocialLogin/SocialLogin';
import { ToastContainer } from 'react-toastify';

const Register = () => {
    let errorMessage;
    let loadingMessage;

    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [sendEmailVerification] = useSendEmailVerification(auth);

    const navigate = useNavigate();

    const handleSignup = (event) => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        createUserWithEmailAndPassword(email, password);
        sendEmailVerification();
    };

    const navigateToLogin = () => {
        navigate("/login");
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]);

    if (error) {
        errorMessage = <div>
            <p className="text-danger text-center">Error: {error.message}</p>
        </div>
    }

    if (loading) {
        loadingMessage = <p className="text-info text-center">Loading...</p>;
    }

    return (
        <div>
            <h2 className="text-center mt-5">Register/Signup</h2>
            <Form className="w-25 m-auto" onSubmit={handleSignup}>
                <Form.Group className="mb-3" controlId="inlineFormInput">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control required type="text" name="name" placeholder="enter your name" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required type="email" name="email" placeholder="enter your email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required type="password" name="password" placeholder="give your password" />
                </Form.Group>
                {errorMessage}
                {loadingMessage}
                <div className="text-center">
                    <Button variant="primary" type="submit" className="w-100 mb-2">Submit</Button>
                </div>
                <p className="mt-3">Already have an account? <Link to="/login" className="text-primary text-decoration-none" onClick={navigateToLogin}>Login</Link></p>
            </Form>
            <div className="w-25 mx-auto"><SocialLogin></SocialLogin></div>
            <ToastContainer />
        </div>
    );
};

export default Register;