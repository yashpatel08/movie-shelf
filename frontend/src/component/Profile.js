import React, { useEffect, useState } from 'react';
import fetchUserId from './fetchUserId';
import {useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [userdata, setUserData] = useState([]);

    const token = localStorage.getItem('jwttoken');
 
    useEffect(() => {
        const fetchData = async () => {
            try {

 

                if (!token) {
                    navigate('/register');
                  throw new Error('No token found, redirecting to login.');
                }

                const userData = await fetchUserId();
                setUserData(userData.user);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem('jwttoken');

        let path = `/users/login`;
        navigate(path);
    };
    return (
        <div>
            <div className='profile-cont'>
            {userdata && (
                <div className='profile-details'>
                    <h2>Profile</h2>
                    <p>Name: {userdata.name}</p>
                    <p>Id: {userdata._id}</p>
                    <p>Email: {userdata.email}</p>
                    <p>Number: {userdata.phone}</p>
                    <button className='signout-btn' onClick={handleSignOut}>Sign out</button>
                </div>
            )}
            
        </div>
        </div>
    )
}

export default Profile