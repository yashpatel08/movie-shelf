import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import LoginValidations from '../validations/LoginValidations';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const token = localStorage.getItem('jwttoken');

  axios.defaults.withCredentials = true;
  // const routeChange = () => {
  //   let path = `/users/register`;
  //   navigate(path);
  // }

  const handleSubmit = async (e) => {

    e.preventDefault();
    await LoginValidations.validate({ email, password });

    try {
      const response = await axios.post(`https://movie-shelfbackend.onrender.com/users/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response();
      console.log(data);

      if (data.status === 'success') {
        const token = data.accesstoken;

        if (token) {
          console.log('Token from response:', token);
          localStorage.setItem('jwttoken', token);

          console.log('Token saved in localStorage:', localStorage.getItem('jwttoken'));
          console.log('Login successful');
          console.log('Current User:', data.currentUser);
          alert('Login Successful');
          navigate('/home');
        } else {
          console.error('Token is undefined in the response');
        }
      } else {
        console.log('Login unsuccessful:', data.message);
        alert('Please check your username and password');
      }
    } catch (error) {
      if (error.response) {
        console.log('Error during login:', error.response.data);
        console.log('Status code:', error.response.status);
      } else if (error.request) {
        console.log('Error login: No response received');
      } else {
        console.log('Error during login:', error.message);
      }
    }
  }

  return (
    <div>
      <div className='form-container'>
        <h2>Login</h2>
        <form className='login-form' onSubmit={handleSubmit}>
          <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} name='email' className='login-item' />
          <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} name='password' className='login-item' />
          <button className='login-btn'>Login</button>
          <Link to="/register" className=''>Did't have account?Register</Link> 

        </form>
      </div>
    </div>
  )
}

export default Login