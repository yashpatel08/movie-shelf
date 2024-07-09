import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const navigate = useNavigate();
    const [userdata, setUserData] = useState(null);
    const token = localStorage.getItem('jwttoken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!token) {
                    navigate('/login');
                    toast.error('You need to log in to access this page');
                    return;
                }

                const userData = localStorage.getItem('userData');
                if (userData) {
                    const parsedUserData = JSON.parse(userData);
                    setUserData(parsedUserData.user);
                } else {
                    // Optional: If userData is not in localStorage, you might want to fetch it from the API
                    // Uncomment below lines if fetching from API is needed
                    // const response = await fetch('https://movie-shelfbackend.onrender.com/users/profile', {
                    //     headers: {
                    //         'Authorization': `Bearer ${token}`
                    //     }
                    // });
                    // if (response.ok) {
                    //     const data = await response.json();
                    //     setUserData(data.user);
                    // } else {
                    //     console.error('Error fetching user data from API:', response.statusText);
                    // }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [navigate, token]);

    const handleSignOut = () => {
        localStorage.removeItem('jwttoken');
        localStorage.removeItem('userData');
        navigate('/login');
        toast.success('👋 You have been signed out');
    };

    return (
        <div className="profile-container p-4 mx-auto max-w-lg bg-white shadow-lg rounded-lg">
            {userdata ? (
                <div className="profile-details">
                    <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                    <p className="mb-2"><strong>Name:</strong> {userdata.name}</p>
                    <p className="mb-2"><strong>Id:</strong> {userdata._id}</p>
                    <p className="mb-2"><strong>Email:</strong> {userdata.email}</p>
                    <p className="mb-2"><strong>Number:</strong> {userdata.phone}</p>
                    <button
                        className="signout-btn bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        onClick={handleSignOut}
                    >
                        Sign out
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
