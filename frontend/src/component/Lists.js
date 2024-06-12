import React, { useEffect, useState } from 'react';
import axios from 'axios';
import fetchUserId from './fetchUserId';
import { useNavigate } from 'react-router-dom';

const Lists = () => {
    const [data, setData] = useState([]);
    const [userdata, setUserData] = useState([]);
    const token = localStorage.getItem('jwttoken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                setTimeout(() => {
                    let path = '/register';
                    navigate(path);
                    return;
                }, 5000);
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


    return (
        <div className='main-list'>
            <h2>Lists</h2>

            <div className="list-container">
                {data.length > 0 ? (

                    data.map((list, index) => (
                        <div key={index} className='list'>
                            <div className="list1">

                            <h3>List {index + 1}</h3>
                            <p>List Name: <span>{list.listname.replace(`_${list.user}`, '')}</span></p>
                            {/* <p>User: {userdata.name}</p> */}
                            <p>Visiblity: {list.visible}</p>
                            </div>
                            <h4>Movies:</h4>
                            <ul>
                                <div className="list-movielist">

                                {list.movies.map((movie, movieIndex) => (
                                    <li key={movieIndex}>{movie.moviename}</li>
                                ))}
                                </div>
                            </ul>
                        </div>
                    ))

                ) : (
                    <p>No lists found.</p>
                )}
            </div>

        </div>
    )
}

export default Lists