import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fetchUserId from './fetchUserId';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Lists = () => {
    const [data, setData] = useState([]);
    const [userdata, setUserData] = useState([]);
    const token = localStorage.getItem('jwttoken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await fetchUserId();
                setUserData(userData.user);
                console.log("user", userData);

                const userId = userData.user._id;
                console.log("id", userId);
                const response = await fetch(`https://movie-shelfbackend.onrender.com/lists/lists/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result);
                console.log(result);
            } catch (error) {
                console.error('Error fetching data:', error);
                setData([]);
            }
        };

        fetchData();
    }, [navigate, token]);

    const deleteRoute = async (listId) => {
        try {
            const res = await axios.delete(`https://movie-shelfbackend.onrender.com/lists/remove-list/${listId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setData(data.filter(list => list._id !== listId));
            console.log('deleted', res);
            toast.success('🎉 List deleted successfully');
        } catch (error) {
            console.log(error);
            toast.error('⚠️ An error occurred while deleting the list. Please try again later.');
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-semibold mb-6">My Lists</h2>

                <div className="space-y-6">
                    {data.length > 0 ? (
                        data.map((list, index) => (
                            <div key={list._id} className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold">List {index + 1}</h3>
                                    <button
                                        className="text-red-500 hover:text-red-700 transition ease-in-out"
                                        onClick={() => deleteRoute(list._id)}
                                    >
                                        <i className="fa-solid fa-trash text-lg"></i>
                                    </button>
                                </div>
                                <p className="mb-2">List Name: <span className="font-medium">{list.listname.replace(`_${list.user}`, '')}</span></p>
                                <p className="mb-4">Visibility: <span className="font-medium">{list.visible}</span></p>
                                <h4 className="text-lg font-semibold mb-2">Movies:</h4>
                                <ul className="list-disc pl-5">
                                    {list.movies && list.movies.length > 0 ? (
                                        list.movies.map((movie, movieIndex) => (
                                            <li key={movieIndex} className="text-gray-700">{movie.moviename}</li>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">Please add movies to the list.</p>
                                    )}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No lists found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Lists;
