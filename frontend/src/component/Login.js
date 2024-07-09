import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginValidations from '../validations/LoginValidations';
import axios from 'axios';
import fetchUserId from './fetchUserId'; 
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await LoginValidations.validate({ email, password });
      setLoading(true);

      const response = await axios.post('https://movie-shelfbackend.onrender.com/users/login', {
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
      setLoading(false);
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            className={`w-full py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition ease-in-out ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;
