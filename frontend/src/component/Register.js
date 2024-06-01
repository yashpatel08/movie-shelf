import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [password, setPassword] = useState([]);
  const [phone, setPhone] = useState([]);
  const [cpassword, setCpassword] = useState([]);


  const routeChange = () => {
    let path = `/users/login`;
    navigate(path);
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      if (cpassword === password) {

        await axios.post(`https://movieshelf-phi.vercel.app/api/users/register`, {
          name,
          email, password, phone
        })
          .then(result => console.log(result))
          .catch(err => console.log(err))

        routeChange();

      }
      else {
        alert('Both password is not same');
      }
    } catch (error) {
      console.log(error);
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

          <button className='reg-btn'>Register</button>
          <Link to="/login" className='login-btn' >Already have an account! Login</Link>

        </form>
      </div>
    </div>
  )
}

export default Register