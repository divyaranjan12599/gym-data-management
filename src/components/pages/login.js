// Login.js
import React, { useContext, useEffect, useState } from 'react';
// import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import { storeIsSession } from './session';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const Login = () => {

    

    let {userAuth, userAuth: { token }, setUserAuth  } = useContext(UserContext);
    // const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

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
            toast.error(response.data.message)
            console.log(response)
        })
    };

    // console.log("first", userAuth)

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
                                    <input type="email" onChange={(e) => setEmail(e.target.value)} class="form-control" id="email" placeholder="Enter email" required />
                                </div>
                                <div class="form-group mb-3" id="formPassword">
                                    <label for="password">Password</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} class="form-control" id="password" placeholder="Password" required />
                                </div>
                                <button type="submit" onClick={handleLogin} class="btn btn-primary w-100">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
