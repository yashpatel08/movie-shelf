import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './component/Home';
import MovieList from './component/movieList'; 
import MovieDetail from './component/movieDetail';
import Login from './component/Login';
import Register from './component/Register';
import Navbar from './component/Navbar';
import List from './component/Lists';
import Profile from './component/Profile';

const App = () => {

  return (
    <div className='app'>
      <BrowserRouter>
        <div className='app-container'>
          <Navbar />
          <div className='content'>
            <Routes>
              <Route exact path='*' element={<Home />} />
              <Route path='/movies' element={<MovieList />} />
              <Route path='/moviedetail/:imdbID' element={<MovieDetail />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/lists' element={<List />} />
              <Route path='/profile' element={<Profile />} />
  
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )

}

export default App;