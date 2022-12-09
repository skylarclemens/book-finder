import "./App.scss";
import Search from "./components/Search/Search";
import { Routes, Route } from "react-router-dom";
import Book from "./components/Book/Book";

const App = () => {
  return (
    <>
      <Search />
      <div className="body-container">
        <Routes>
          <Route path='/book/:id' element={<Book />} />
        </Routes>
      </div>
    </>
  );
}

export default App;