import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search/Search";
import Book from "./components/Book/Book";
import BooksImage from './books.png';
import ProfileImage from './profile.png'
import UserBooks from "./components/UserBooks/UserBooks";
import Login from "./components/Login/Login";
import Home from './components/Home/Home';
import { useSelector } from "react-redux";
import Recommended from "./components/Recommended/Recommended";

const App = () => {
  const user = useSelector(state => state.user);

  return (
    <>
      <div className="navigation">
        <Link to="/">
          <img className="logo" src={BooksImage} alt="Stack of books"/>
        </Link>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/books">My Books</Link>
        <Link className="nav-link" to="/browse">Browse</Link>
        <Search />
        {!user ? <Link className="nav-link" to="/login">Log In</Link> : <img className="user-nav" src={ProfileImage} alt="User profile"/>}
      </div>
      <div className="body-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book/:id' element={<Book />} />
          <Route path='/books' element={<UserBooks />} />
          <Route path='/login' element={<Login />} />
          <Route path='/browse' element={<Recommended />} />
        </Routes>
      </div>
    </>
  );
}

export default App;