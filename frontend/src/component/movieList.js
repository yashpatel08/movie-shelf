import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MovieList = () => {
    const [data, setData] = useState([]);
    const [name, setName] = useState('');
    const [result, setResults] = useState('');
    const navigate = useNavigate();
    const changeName = (e) => {
        setName(e.target.value);
    };

    const fetchData = async (searchName) => {
        if (!searchName) return;
        const uri = `https://www.omdbapi.com/?apikey=a4fbb6db&s=${searchName}`;
        try {
            const res = await fetch(uri);
            const resData = await res.data;
            if (resData.Response === 'True') {
                setData(resData.Search);
                const array = resData.Search;
                setResults(array.length);

                console.log(resData);
                localStorage.setItem('searchResults', JSON.stringify(resData.Search));
                localStorage.setItem('searchName', searchName);
                localStorage.setItem('searchTime', Date.now());
            } else {
                setData([]);
                setResults(0);
                console.error('Error:', resData.Error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setData([]);
        }
    };

    useEffect(() => {
        const storedResults = localStorage.getItem('searchResults');
        const storedTime = localStorage.getItem('searchTime');
        const storedName = localStorage.getItem('searchName');
        const currentTime = Date.now();
        const timeDifference = currentTime - parseInt(storedTime);

        if (storedResults && timeDifference < 3600000) {
            setName(storedName || '');
            setData(JSON.parse(storedResults));
            setResults(JSON.parse(storedResults).length);
        } else {
            setName('');
            setResults('');
            localStorage.removeItem('searchResults');
            localStorage.removeItem('searchTime');
            localStorage.removeItem('searchName');
        }
    }, []);



    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData(name);
    };

    useEffect(() => {
        if (name) {
            fetchData(name);
        }
    }, [name]);


    const directTo = (imdbID) => {
        navigate(`/moviedetail/${imdbID}`);
        console.log('from list', imdbID);
    };

    return (
        <div className="App">
            <div>
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        type="text"
                        placeholder="Enter movie name"
                        onChange={changeName}
                        value={name}
                        className='search'
                    />
                    <button className='submit-btn' type="submit">Search</button>
                </form>
            </div>
            <h4 className='totalcount'>
                Total Results :  {result}
            </h4>
            {data.length > 0 && (
                <div className='movie-list'>
                    {data.map((movie, index) => (
                        <div key={index} onClick={() => (directTo(movie.imdbID))} className='movie'>
                            <h2>{movie.Title}</h2>
                            <img src={movie.Poster} alt={`${movie.Title} poster`} />
                            <div className="detail">
                                <p>Year: {movie.Year}</p>
                                <p>Type: {movie.Type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieList;
