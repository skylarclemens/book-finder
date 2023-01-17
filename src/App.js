import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Book from "./components/Book/Book";
import UserBooks from "./components/UserBooks/UserBooks";
import Login from "./components/Login/Login";
import Account from "./components/Account/Account";
import Home from './components/Home/Home';
import Recommended from "./components/Recommended/Recommended";
import Nav from "./components/Nav/Nav";
import Register from "./components/Register/Register";
import { initializeBooks, resetBooks } from "./reducers/bookReducer";
import { useDispatch, useSelector } from "react-redux";
import UserBook from "./components/BookStats/BookStats";
import { removeUser, setUser } from "./reducers/userReducer";

const App = () => {
  const [session, setSession] = useState(null);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      const { error } = await supabase.auth.getUser();

      if(error) {
        console.error(error);
        dispatch(removeUser())
        return;
      }
    }
    
    checkUser();

    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') dispatch(setUser(session.user));
      if (event === 'SIGNED_OUT') dispatch(setUser(removeUser()));
    });

  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('user_book')
        .select('*, books(*)');

      if(error) {
        console.error(error);
        return;
      }
      
      dispatch(initializeBooks(data));
    }
    if(user) {
      getData();
    }
  }, [user]);

  return (
    <>
      <Nav />
      <div className="body-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book/:id' element={<Book />} />
          <Route path='/my-books/:id' element={<UserBook />} />
          <Route path='/my-books' element={<UserBooks />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/browse' element={<Recommended />} />
          <Route path='/account' element={<Account session={session} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;