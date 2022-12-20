import './Nav.scss';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Search from "../Search/Search";
import { removeUser } from '../../reducers/userReducer';
import BooksImage from '../../books.png';
import ProfileImage from '../../profile.png'

const Nav = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    setOpenDropdown(false);
    dispatch(removeUser());
  }

  const userNav = (
    <div className="user-nav-container">
      <button className="user-nav" onClick={() => setOpenDropdown(!openDropdown)}>
        <img src={ProfileImage} alt="User profile"/>
      </button>
      {openDropdown ? <div className="user-dropdown">
        <button className="log-out" onClick={handleLogOut}>Log Out</button>
      </div> : ''}
    </div>
  )
   
  return (
    <div className="navigation">
      <Link to="/">
        <img className="logo" src={BooksImage} alt="Stack of books"/>
      </Link>
      <Link className="nav-link" to="/">Home</Link>
      <Link className="nav-link" to="/books">My Books</Link>
      <Link className="nav-link" to="/browse">Browse</Link>
      <Search />
      {!user ? <Link className="nav-link" to="/login">Log In</Link> : userNav}
    </div>
  )
}

export default Nav;