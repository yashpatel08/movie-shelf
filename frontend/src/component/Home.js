import React from 'react';
import MovieList from './movieList';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to MovieShelf!</h1>
        <p className="text-gray-700 mb-6">
          A movie IMDb library where users can create their lists of different types of movies.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Key Features:</h2>
        <ul className="list-disc list-inside mb-6 text-gray-600">
          <li>Create Personalized Lists</li>
          <li>Explore IMDb Database</li>
          <li>Organize by Genre, Type, or Theme</li>
          <li>User Interaction and Engagement</li>
          <li>Cross-Platform Access</li>
        </ul>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Get Started with MovieShelf Today!</h2>
        <p className="text-gray-700 mb-4">
          Join MovieShelf today and embark on a cinematic journey like never before.
        </p>
        <p className="text-gray-700">
          Whether you're a casual moviegoer, a film aficionado, or a seasoned cinephile, MovieShelf offers a personalized and immersive movie-watching experience tailored to your preferences.
        </p>
      </div>
      <MovieList />
    </div>
  );
};

export default Home;
