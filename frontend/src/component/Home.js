import React from 'react'
import MovieList from './movieList'
const Home = () => {
  return (
    <div>
      <div className="movieshelf-intro">
        <h1>Welcome to MovieShelf!</h1>
        <p>A movie IMDb library where users can create their lists of different types of movies.</p>
        <h2>Key Features:</h2>
        <ul>
          <li>Create Personalized Lists</li>
          <li>Explore IMDb Database</li>
          <li>Organize by Genre, Type, or Theme</li>
          <li>User Interaction and Engagement</li>
          <li>Cross-Platform Access</li>
        </ul>
        <h2>Get Started with MovieShelf Today!</h2>
        <p>Join MovieShelf today and embark on a cinematic journey like never before.</p>
        <p>Whether you're a casual moviegoer, a film aficionado, or a seasoned cinephile, MovieShelf offers a personalized and immersive movie-watching experience tailored to your preferences.</p>
      </div>
      <MovieList />
    </div>
  )
}

export default Home