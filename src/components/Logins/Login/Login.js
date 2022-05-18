import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import SocialLogin from '../SocialLogin/SocialLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();
    const location = useLocation();
    let errorMessage;
    let loadingMessage;
    let sendingMessage;

    let from = location.state?.from?.pathname || '/';

    const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

    if (error) {
        errorMessage = <div>
            <p className="text-danger text-center">Error: {error.message}</p>
        </div>
    }

    if (loading) {
        loadingMessage = <p className="text-info text-center">Loading...</p>;
    }

    if (sending) {
        sendingMessage = <p className="text-info text-center">Loading...</p>;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await signInWithEmailAndPassword(email, password);
        //const { data } = await axios.post('https://floating-forest-85140.herokuapp.com/login', { email });
        //localStorage.setItem('accessToken', data);
        navigate(from, { replace: true });
    };

    const resetPassword = async () => {
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast(<div style={{ fontFamily: "Operator Mono" }}>Email sent to {email}</div>);
        }
        else {
            toast(<div style={{ fontFamily: "Operator Mono" }}>Please enter your email address.</div>);
        }
    };

    const navigateToSignup = () => {
        navigate("/signup");
    };

    return (
        <div>
            <h1 className="text-center mt-5">Please Login</h1>
            <Form className="w-25 mx-auto" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control required ref={emailRef} type="email" placeholder="enter your email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control required ref={passwordRef} type="password" placeholder="give your password" />
                </Form.Group>
                {errorMessage}
                {loadingMessage}
                {sendingMessage}
                <div className="text-center">
                    <Button variant="primary" type="submit" className="w-100 mb-2">Submit</Button>
                </div>
                <p className="mt-3">New to Online-Tutor? <Link to="/register" className="text-primary text-decoration-none" onClick={navigateToSignup}>Register/Signup</Link></p>
                <p className="mt-3">Forgotten password? <Link to="" className="text-primary text-decoration-none" onClick={resetPassword}>Reset Password</Link></p>
            </Form>
            <div className="w-25 mx-auto"><SocialLogin></SocialLogin></div>
            <ToastContainer />
        </div>
    );
};

export default Login;