import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Book from "./components/Book/Book";
import UserBooks from "./components/UserBooks/UserBooks";
import Login from "./components/Login/Login";
import Home from './components/Home/Home';
import Recommended from "./components/Recommended/Recommended";
import Nav from "./components/Nav/Nav";

const App = () => {
  

  return (
    <>
      <Nav />
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