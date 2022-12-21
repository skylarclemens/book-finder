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

const App = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <>
      <Nav session={session}/>
      <div className="body-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/book/:id' element={<Book />} />
          <Route path='/books' element={<UserBooks />} />
          <Route path='/login' element={<Login />} />
          <Route path='/browse' element={<Recommended />} />
          <Route path='/account' element={<Account session={session} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;