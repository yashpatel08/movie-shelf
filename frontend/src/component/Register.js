import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast} from 'react-toastify';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [phone, setPhone] = useState([]);
  const [cpassword, setCpassword] = useState([]);
  const [loading, setLoading] = useState(false);

  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {
      if (cpassword === password) {
        const response = await axios.post(`https://movie-shelfbackend.onrender.com/users/register`, {
          name,
          email,
          password,
          phone
        }, {
          headers: {
            'Content-Type': 'application/json'
          },
        });


        if (response.status === 200) {
          const result = await response.data;
          console.log(result);
          toast.success('🎉 Registration successful!');
          routeChange();
        } else {
          const errorData = await response.json();
          console.log('Error:', errorData);
        }
      } else {
        toast.error('⚠️ Both passwords must be the same');
      }
    } catch (error) {
      console.log('Error during registration:', error);
      toast.error('❌ An error occurred during registration. fill feedback form with in which feature it has error showing');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='reg-container'>
        <h2>Register</h2>
        <form className='reg-form' onSubmit={handleSubmit}>
          <input type='text' placeholder='Enter name' onChange={(e) => { setName(e.target.value) }} name='name' className='reg-item' />
          <input type='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }} name='email' className='reg-item' />
          <input type='number' placeholder='number' onChange={(e) => { setPhone(e.target.value) }} name='phone' className='reg-item' />
          <input type='password' placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} name='password' className='reg-item' />
          <input type='password' placeholder='Confirm Password' onChange={(e) => { setCpassword(e.target.value) }} name='cpassword' className='reg-item' />

          <button className='reg-btn' type='submit' disabled={loading}>
            {loading ? 'Loading...' : 'Register'}
          </button> 
          <Link to="/login" className='login-btnn' >Already have an account! Login</Link>

        </form>
      </div>
    </div>
  )
}

export default Register