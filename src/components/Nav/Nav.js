import './Nav.scss';
import { Link } from "react-router-dom";
import { useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Search from "../Search/Search";
import { removeUser } from '../../reducers/userReducer';
import { resetBooks } from '../../reducers/bookReducer';
import BooksImage from '../../books.png';
import ProfileImage from '../../profile.png';
import { supabase } from '../../supabaseClient';
import useClickOut from '../../hooks/useClickOut';

const Nav = ({ session }) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const user = useSelector(state => state.user);
  const dropdownEl = useRef(null);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    closeDropdown();

    const { error } = await supabase.auth.signOut();

    if(error) {
      console.error(error);
      return;
    }

    dispatch(removeUser());
    dispatch(resetBooks());
  }

  const closeDropdown = () => {
    setOpenDropdown(false);
  }

  useClickOut(dropdownEl, closeDropdown);

  const userNav = (
    <div className="user-nav-container">
      <button className="user-nav" onClick={() => setOpenDropdown(!openDropdown)}>
        <img src={ProfileImage} alt="User profile"/>
      </button>
      <div ref={dropdownEl} className={`user-dropdown ${openDropdown ? 'open' : ''}`}>
        <Link to="/account" onClick={closeDropdown}>Account</Link>
        <button className="log-out" onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  )
   
  return (
    <div className="navigation">
      <Link to="/" className="logo">
        Zine
      </Link>
      <Link className="nav-link" to="/my-books">MY BOOKS</Link>
      <Link className="nav-link" to="/browse">BROWSE</Link>
      <Search />
      {!session ? <Link className="nav-link" to="/login">LOG IN</Link> : userNav}
    </div>
  )
}

export default Nav;