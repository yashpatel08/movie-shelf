import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('jwttoken');
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuClicked(!isMenuClicked);
    };

    const closeMenu = () => {
        setIsMenuClicked(false);
    };

    useEffect(() => {
        console.log('Token:', token);

 
        if (!token) {
            // Allow access to login and register if no token is present
            console.log("No token, allowing access to public pages");
            return; // Don't try to decode or fetch data if there's no token
        }

        let decodedToken;
        try {
            decodedToken = jwtDecode(token);
            console.log('Token:', decodedToken);
        } catch (error) {
            console.error('Error decoding token:', error.message);
            navigate('/login');
            return;
        }
 
        const fetchUserData = async (userId) => {
            try {
                const response = await fetch(`https://movie-shelfbackend.onrender.com/users/user/${userId}`);
                if (response.ok) {
                    const responseData = await response.json();  

                    if (responseData.user) {
                        const userData = responseData.user;
                        setIsAdmin(userData.admin);
                        console.log('admin:', userData.admin);
                    } else {
                        console.error('User not found');
                    }
                } else {
                    console.error('Error fetching user data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchUserData(decodedToken._id.toString());
    }, [token, navigate]);  
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h4 className="text-2xl font-bold">MovieShelf</h4>
                <div className="hidden md:flex space-x-4">
                    <Link to='/home' className='hover:bg-gray-700 px-3 py-2 rounded'>Home</Link>
                    <Link to='/lists' className='hover:bg-gray-700 px-3 py-2 rounded'>Lists</Link>
                    {isAdmin && (
                        <div className="hidden md:block">
                            <Link to="/admin/dashboard" className="hover:bg-gray-700 px-3 py-2 rounded">Admin Dashboard</Link>
                        </div>
                    )}
                    {token ? (
                        <Link to="/profile" className='hover:bg-gray-700 px-3 py-2 rounded'>Profile</Link>
                    ) : (
                        <div className='flex space-x-4'>
                            <Link to="/login" className='hover:bg-gray-700 px-3 py-2 rounded'>Login</Link>
                            <Link to="/register" className='hover:bg-gray-700 px-3 py-2 rounded'>Register</Link>
                        </div>
                    )}
                </div>

                <button
                    className="md:hidden text-white text-2xl"
                    onClick={toggleMenu}
                >
                    <i className={isMenuClicked ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
                </button>
            </div>

            {isMenuClicked && (
                <div className="md:hidden bg-gray-800 text-white p-4">
                    <Link to='/home' className='block py-2 px-4 hover:bg-gray-700' onClick={closeMenu}>Home</Link>
                    <Link to='/lists' className='block py-2 px-4 hover:bg-gray-700' onClick={closeMenu}>Lists</Link>
                    {isAdmin && (
                        <div className="block">
                            <Link to="/admin/dashboard" className="block py-2 px-4 hover:bg-gray-700" onClick={closeMenu}>Admin Dashboard</Link>
                        </div>
                    )}
                    {token ? (
                        <Link to="/profile" className='block py-2 px-4 hover:bg-gray-700' onClick={closeMenu}>Profile</Link>
                    ) : (
                        <div className='flex flex-col'>
                            <Link to="/login" className='block py-2 px-4 hover:bg-gray-700' onClick={closeMenu}>Login</Link>
                            <Link to="/register" className='block py-2 px-4 hover:bg-gray-700' onClick={closeMenu}>Register</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
