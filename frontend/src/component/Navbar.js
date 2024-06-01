import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const token = localStorage.getItem('jwttoken');
    // const decodedToken = jwtDecode(token);
    const navigate = useNavigate();
    useEffect(() => {

        if (!token) {
            setTimeout(() => {

                let path = `/register`;
                navigate(path);
                return;
            }, 100000);
            return;
        }

        const decodedToken = jwtDecode(token);

  
        const fetchUserData = async (userId) => {
            try {
                const response = await fetch(`https://movieshelf-two.vercel.app/users/user/${userId}`, {});
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

        // Call this function with the user ID obtained from the decoded token
        fetchUserData(decodedToken._id.toString());

    }, []);

    return (
        <div className='main-nav'>
            <div className='navbar'>
                <h4 className='title'>MovieShelf</h4>
                <Link to='/home' className='nav-items'>Home</Link>
                <Link to='/lists' className='nav-items'>Lists</Link>
                {isAdmin && (
                    <div className="admin-section">
                        <Link to="/admin/dashboard" className="nav-items">Admin Dashboard</Link>
                    </div>
                )}

                {token ? (
                    <Link to="/profile" className='nav-items'>Profile</Link>
                ) : (
                    <div className='sub-items'>
                        <Link to="/login" className='nav-items'>Login</Link>
                        <Link to="/register" className='nav-items'>Register</Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar   