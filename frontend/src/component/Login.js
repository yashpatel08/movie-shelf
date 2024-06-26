import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import LoginValidations from '../validations/LoginValidations';
import axios from 'axios';
import fetchUserId from './fetchUserId'; 
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const token = localStorage.getItem('jwttoken');
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;
  // const routeChange = () => {
  //   let path = `/users/register`;
  //   navigate(path);
  // }

  const handleSubmit = async (e) => {

    e.preventDefault();
    await LoginValidations.validate({ email, password });
    setLoading(true);

    try {
      const response = await axios.post(`https://movie-shelfbackend.onrender.com/users/login`, {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.data;
      console.log(data);

      if (data.status === 'success') {
        const token = data.accesstoken;

        if (token) {
          console.log('Token from response:', token);
          localStorage.setItem('jwttoken', token);

          console.log('Login successful');

          try {
            const userData = await fetchUserId(token);
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('User data fetched and stored:', userData);
          } catch (fetchError) {
            console.error('Error fetching user data:', fetchError.message);
          }

          toast.success('🎉 Login Successful');
          setLoading(false);
          navigate('/home');
        } else {
          console.error('Token is undefined in the response');
        }
      } else {
        console.log('Login unsuccessful:', data.message);
        toast.error('⚠️ Please check your email and password');
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
          <button className='login-btn' type='submit' disabled={loading}>
            {loading ? 'Loading...' : 'Login'}
          </button>
          <Link to="/register" className=''>Did't have account?Register</Link> 

        </form>
      </div>
    </div>
  )
}

export default Login