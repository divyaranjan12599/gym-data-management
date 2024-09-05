// Login.js
import React, { useContext, useEffect, useState } from 'react';
// import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { storeIsSession } from './session';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button, Form, Modal } from 'react-bootstrap';
// import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const Login = () => {

    const [showForgetPasswordModal, setShowForgetPasswordModal] = useState(false);
    const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
    const [isOtpVisible, setIsOtpVisible] = useState(false);
    const [femail, setFEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    let { userAuth, userAuth: { token }, setUserAuth } = useContext(UserContext);
    // const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleShowForgetPassword = () => setShowForgetPasswordModal(true);
    const handleCloseForgetPassword = () => setShowForgetPasswordModal(false);
    const handleShowResetPassword = () => setShowResetPasswordModal(true);
    const handleCloseResetPassword = () => setShowResetPasswordModal(false);

    const handleSubmitFEmail = () => {
        // Trigger OTP input field visibility
        setIsOtpVisible(true);
    };

    const handleSubmitOtp = () => {
        // Here you would typically validate the OTP before showing the reset password fields
        // For simplicity, we'll assume OTP is always correct
        setIsOtpVisible(false);
        handleCloseForgetPassword();
        handleShowResetPassword();
        // Optionally: Open another modal for password reset if needed
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        // Handle reset password logic here
    };

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_SERVER_URL + '/user/login', { email, password })
            .then(({ data }) => {
                storeIsSession("user", JSON.stringify(data))
                setUserAuth(data)
                if (data.token) {
                    toast.success("Login Successful")
                    navigate('/')
                }
            })
            .catch(({ response }) => {
                toast.error(response)
            })
    };

    return (
        <div class="container d-flex align-items-center justify-content-center w-100" style={{ height: '90vh' }}>
            <div class="card p-2">
                <div class="card-body">
                    <h2 class="text-center mb-4">Login</h2>
                    <form>
                        <div class="form-group mb-3" id="formEmail">
                            <label for="email">Email address or Contact</label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} class="form-control" id="email" placeholder="Enter email" required />
                        </div>
                        <div class="form-group mb-3" id="formPassword">
                            <label for="password">Password</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" id="password" placeholder="Password" required />
                        </div>
                        <div class="form-group text-end mb-3">
                            <Button variant="link" className='forgot-password-link' onClick={handleShowForgetPassword}>
                                Forgot password?
                            </Button>
                        </div>
                        <button type="submit" onClick={handleLogin} class="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            </div>
            <Modal show={showForgetPasswordModal} centered onHide={handleCloseForgetPassword}>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="recoverEmail">
                            <Form.Label>Enter your email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={femail}
                                onChange={(e) => setFEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        {isOtpVisible && (
                            <Form.Group className="mb-3" controlId="otp">
                                <Form.Label>Enter OTP</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        )}

                        {!isOtpVisible ? (
                            <Button variant="primary" className="w-100" onClick={handleSubmitFEmail}>
                                Submit
                            </Button>
                        ) : (
                            <Button variant="primary" className="w-100" onClick={handleSubmitOtp}>
                                Verify OTP
                            </Button>
                        )}
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Reset Password Modal */}
            <Modal show={showResetPasswordModal} centered onHide={handleCloseResetPassword}>
                <Modal.Header closeButton>
                    <Modal.Title>Reset Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleResetPassword}>
                        <Form.Group className="mb-3" controlId="newPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">
                            Reset Password
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Login;
