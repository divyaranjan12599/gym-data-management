// Login.js
import React, { useState } from 'react';
// import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
// import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const Login = () => {
    // const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Implement your authentication logic here
        // login();
        navigate('/home'); // Redirect to home or any other route after login
    };

    return (
        <div class="container d-flex align-items-center justify-content-center w-100 h-100">
            <div class="row">
                <div class="col">
                    <div class="card p-4">
                        <div class="card-body">
                            <h2 class="text-center mb-4">Login</h2>
                            <form>
                                <div class="form-group mb-3" id="formEmail">
                                    <label for="email">Email address or Contact</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter email" required />
                                </div>
                                <div class="form-group mb-3" id="formPassword">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" id="password" placeholder="Password" required />
                                </div>
                                <button type="submit" class="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
