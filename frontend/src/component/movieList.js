import React, { useState, useEffect } from 'react';
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
            const resData = await res.json();
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
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="flex flex-col mb-6">
                    <input
                        type="text"
                        placeholder="Enter movie name"
                        onChange={changeName}
                        value={name}
                        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ease-in-out"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </div>
            <h4 className="text-center text-lg font-semibold mb-4">
                Total Results: {result}
            </h4>
            {data.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {data.map((movie, index) => (
                        <div
                            key={index}
                            onClick={() => directTo(movie.imdbID)}
                            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition ease-in-out"
                        >
                            <img
                                src={movie.Poster}
                                alt={`${movie.Title} poster`}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
                                <div className="text-sm text-gray-600">
                                    <p>Year: {movie.Year}</p>
                                    <p>Type: {movie.Type}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieList;
