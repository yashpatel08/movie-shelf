import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [loading, setLoading] = useState(false);

    const routeChange = () => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== cpassword) {
            toast.error('⚠️ Both passwords must be the same');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'https://movie-shelfbackend.onrender.com/users/register',
                {
                    name,
                    email,
                    password,
                    phone
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {

                const { token } = response;
                
                // Save the token to localStorage
                localStorage.setItem('jwttoken', token);

                toast.success('🎉 Registration successful!');

                navigate('/login');

            } else {
                toast.error('⚠️ Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error('❌ An error occurred during registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" flex flex-col justify-center text-center item-center max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            <form className="reg-form flex flex-col justify-center item-center " onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="reg-item mb-3 p-2 border rounded"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="reg-item mb-3 p-2 border rounded"
                    required
                />
                <input
                    type="tel"
                    placeholder="Phone number"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    className="reg-item mb-3 p-2 border rounded" required
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="reg-item mb-3 p-2 border rounded" required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setCpassword(e.target.value)}
                    value={cpassword}
                    className="reg-item mb-3 p-2 border rounded" required
                />
                <button
                    className="reg-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Register'}
                </button>
                <div className="mt-4">
                    <Link to="/login" className="login-btn text-blue-500 hover:underline">
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
