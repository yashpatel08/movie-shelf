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
        console.log(imdbID);
        const response = await fetch(`https://www.omdbapi.com/?apikey=a4fbb6db&i=${imdbID}`);
        const data = await response.json();
        setMovie(data);
        console.log(data);
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

  const addToList = async (movieId) => {
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
      console.log("id", userId);
      if (!token) {
        navigate('/login');
        console.error('No token found');
        return;
      }

      const response = await axios.post(`https://movie-shelfbackend.onrender.com/lists/addmovie`, {
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
      const data = await response.data;
      console.log('in addinlist', data);
      handleCloseModal();
      setLoading(false);
      toast.success('🎉 Movie added to list successfully');

    } catch (error) {
      console.error('Error adding movie to list:', error.message);
      toast.error('⚠️ An error occurred while adding movie to list , fill feedback form with in which feature it has error showing');
 
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
      const data = await response.data;
      console.log('Movie removed successfully', data);
      toast.success('🎉 Movie removed from list successfully');

    } catch (error) {
      console.error('Error removing movie from list:', error.message);
      console.log("movieId", movieId);
      console.log("userId", userId);
      toast.error('⚠️ An error occurred while removing movie from list, fill feedback form with in which feature it has error showing'); 

    }
  };
  return (
    <div className="movie-detail">
      {movie ? (
        <div className='movieDetail'>
          <h2>{movie.Title}</h2>
          <div className='detail-container'>

            <div className="left">

              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <p>IMDb Rating: <span>
                {movie.imdbRating}</span></p>

            </div>
            <div className="right">

              <p>Actors: <span>{movie.Actors}</span></p>
              <p>Awards: <span>{movie.Awards}</span></p>
              <p>Box Office: <span>{movie.BoxOffice}</span></p>
              <p>Country: <span>{movie.Country}</span></p>
              <p>Director: <span>{movie.Director}</span></p>
              <p>Genre: <span>{movie.Genre}</span></p>
              <p>Language: <span>{movie.Language}</span></p>
              <p>Metascore: <span>{movie.Metascore}</span></p>
              <p>Plot: <span>{movie.Plot}</span></p>
              <p>Released: <span>{movie.Released}</span></p>
              <p>Runtime: <span>{movie.Runtime}</span></p>
              <p>Year: <span>{movie.Year}</span></p>
              <p>IMDb Votes: <span>{movie.imdbVotes}</span></p>
            </div>
          </div>

          <div className="other-details">
            <div className="other1">

              <h4>Plot</h4>
              <p>{movie.Plot}</p>

              <h4>Run Time</h4>
              <p>{movie.Runtime}</p>

            </div>
            <div className="other2">
              <button className='fav-button' onClick={() => addToList(imdbID)}>Add To List</button>
              <button className='rem-button' onClick={() => removeMovieFromList(userId, imdbID)}>Remove from list</button>

            </div>
          </div>
        </div>

      ) : (
        <p>Loading... OR try to refresh</p>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className='x-button' onClick={() => handleCloseModal(imdbID)}>X</button>
            <h2>{movie.Title}</h2>
            <p>Id: {selectedMovie} </p>
            <input type="text" placeholder='Enter list name' onChange={(e) => setListName(e.target.value)} />
            <label>
              <input type="checkbox" checked={isPublic} onChange={handleCheckboxChange} />
              Public List
            </label>
            <button className='add-button' onClick={() => addInList(imdbID)}>
            {loading ? 'Please Wait...' : 'Add'}
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail