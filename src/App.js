import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
import Search from "./components/Search/Search";
import Book from "./components/Book/Book";
import Recommended from "./components/Recommended/Recommended";
import BooksImage from './books.png';

const App = () => {
  return (
    <>
      <div className="navigation">
        <Link to="/">
          <img className="logo" src={BooksImage} alt="Stack of books"/>
        </Link>
        <Search />
      </div>
      <div className="body-container">
        <Routes>
          <Route path='/' element={<Recommended />} />
          <Route path='/book/:id' element={<Book />} />
        </Routes>
      </div>
    </>
  );
}

export default App;