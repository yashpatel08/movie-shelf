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
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Footer from './component/Footer';

const App = () => {

  axios.defaults.withCredentials=true;
  return (
    <div className='app'>
      <BrowserRouter>
        <div className='app-container'>
          <Navbar />
          <div className='content'>            
          <ToastContainer theme="dark"/>
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
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )

}

export default App;