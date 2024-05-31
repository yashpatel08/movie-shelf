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
      const response = await axios.post('${process.env.NEXT_PUBLIC_BASE_API_URL}/users/login', {
        email, password
      });

      console.log(response);


      if (response.data.status === 'success') {
        const token = response.data.accesstoken;

        if (token) {
          // Log token and save it to localStorage
          console.log('Token from response:', token);
          localStorage.setItem('jwttoken', token);

          // Log token from localStorage
          console.log('Token saved in localStorage:', localStorage.getItem('jwttoken'));

          // Log other details and perform actions
          console.log('Login successful');
          console.log('Current User:', response.data.currentUser);
          alert('Login Successful');
          navigate('/home');
        }
        else {
          // Log if token is undefined in the response
          console.error('Token is undefined in the response');
        }
      }
      else {
        console.log('Login unsuccessful:', response.data.message);
        alert('Please check your username and password');
      }
    } catch (error) {
      if (e.response) {

        console.log('Error during login:', e.response.data);
        console.log('Status code:', e.response.status);
      } else if (e.request) {

        console.log('Error during login: No response received');
      } else {

        console.log('Error during login:', e.message);
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