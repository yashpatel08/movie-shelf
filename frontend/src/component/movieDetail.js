import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import fetchUserId from './fetchUserId';
import { toast } from 'react-toastify';

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState('');
  const [listName, setListName] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('jwttoken');
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=a4fbb6db&i=${imdbID}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchUserData = async () => {
      try {
        const userData = await fetchUserId();
        setUserId(userData.user._id);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchMovie();
    fetchUserData();

  }, [imdbID]);

  const addToList = (movieId) => {
    setSelectedMovie(movieId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie('');
  };

  const handleCheckboxChange = () => {
    setIsPublic(!isPublic); // Toggle the value of isPublic
  };

  const addInList = async () => {
    try {
      setLoading(true);
      if (!token) {
        navigate('/login');
        console.error('No token found');
        return;
      }

      const response = await axios.post('https://movie-shelfbackend.onrender.com/lists/addmovie', {
        listname: listName,
        movieId: imdbID,
        moviename: movie.Title,
        visible: isPublic ? 'public' : 'private',
        user: userId
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      handleCloseModal();
      setLoading(false);
      toast.success('🎉 Movie added to list successfully');
    } catch (error) {
      console.error('Error adding movie to list:', error.message);
      toast.error('⚠️ An error occurred while adding movie to list');
    }
  };

  const removeMovieFromList = async (userId, movieId) => {
    try {
      if (!token) {
        navigate('/login');
        console.error('No token found');
        return;
      }

      const response = await axios.delete(`https://movie-shelfbackend.onrender.com/lists/remove-movie/${userId}/${movieId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('🎉 Movie removed from list successfully');
    } catch (error) {
      console.error('Error removing movie from list:', error.message);
      toast.error('⚠️ An error occurred while removing movie from list');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
  {movie ? (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto"> {/* Adjusted max-w-4xl */}
      <h2 className="text-4xl font-bold mb-6 text-center">{movie.Title}</h2> {/* Increased font size */}
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="w-full h-auto rounded-lg shadow-md"
          />
          <p className="mt-2 text-lg text-gray-600">IMDb Rating: <span className="font-semibold">{movie.imdbRating}</span></p> {/* Increased font size */}
        </div>
        <div className="md:w-2/3 pl-0 md:pl-6">
          {/* Adjust other text sizes similarly */}
          <p className="text-lg mb-2">Actors: <span className="font-semibold">{movie.Actors}</span></p>
          <p className="text-lg mb-2">Awards: <span className="font-semibold">{movie.Awards}</span></p>
          <p className="text-lg mb-2">Box Office: <span className="font-semibold">{movie.BoxOffice}</span></p>
          <p className="text-lg mb-2">Country: <span className="font-semibold">{movie.Country}</span></p>
          <p className="text-lg mb-2">Director: <span className="font-semibold">{movie.Director}</span></p>
          <p className="text-lg mb-2">Genre: <span className="font-semibold">{movie.Genre}</span></p>
          <p className="text-lg mb-2">Language: <span className="font-semibold">{movie.Language}</span></p>
          <p className="text-lg mb-2">Metascore: <span className="font-semibold">{movie.Metascore}</span></p>
          <p className="text-lg mb-2">Plot: <span className="font-semibold">{movie.Plot}</span></p>
          <p className="text-lg mb-2">Released: <span className="font-semibold">{movie.Released}</span></p>
          <p className="text-lg mb-2">Runtime: <span className="font-semibold">{movie.Runtime}</span></p>
          <p className="text-lg mb-2">Year: <span className="font-semibold">{movie.Year}</span></p>
          <p className="text-lg mb-2">IMDb Votes: <span className="font-semibold">{movie.imdbVotes}</span></p>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
        <div >
          <button
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition ease-in-out"
            onClick={() => addToList(imdbID)}
          >
            Add To List
          </button>
          <button
            className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition ease-in-out ml-4"
            onClick={() => removeMovieFromList(userId, imdbID)}
          >
            Remove from List
          </button>
        </div>
      </div>
    </div>
      ) : (
        <p className="text-center text-gray-600">Loading... OR try to refresh</p>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleCloseModal}
            >
              X
            </button>
            <h2 className="text-2xl font-semibold mb-4">{movie.Title}</h2>
            <p className="mb-4">Id: {selectedMovie}</p>
            <input
              type="text"
              placeholder="Enter list name"
              onChange={(e) => setListName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Public List
            </label>
            <button
              className={`w-full py-2 rounded-md text-white ${loading ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'} transition ease-in-out`}
              onClick={addInList}
              disabled={loading}
            >
              {loading ? 'Please Wait...' : 'Add'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
