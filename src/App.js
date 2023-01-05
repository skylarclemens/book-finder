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
import { removeUser } from "./reducers/userReducer";

const App = () => {
  const [session, setSession] = useState(null);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session, user }}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.from('user_book')
        .select('tag, books(*)');

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
      <Nav session={session}/>
      <div className="body-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book/:id' element={<Book />} />
          <Route path='/books' element={<UserBooks />} />
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