import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const baseUrl = "https://www.googleapis.com/books/v1/volumes?";
  const apiKey = process.env.REACT_APP_API_KEY;

  // GET search results when user has stopped typing for 2 seconds
  useEffect(() => {
    if(searchText.length) {
      const handleSearch = () => {
        axios.get(`${baseUrl}q=${searchText}&key=${apiKey}`)
        .then((res) => {
          setSearchData(res.data.items);
        });
      }

      let debouncer = setTimeout(() => {
        handleSearch();
      }, 2000);

      return () => clearTimeout(debouncer);
    } else {
      setSearchData([]);
      return;
    }
  }, [searchText]);

  return (
    <div className="search-container">
      <input type="text" placeholder="Search" name="search" onChange={(e) => setSearchText(e.target.value)}></input>
      <SearchResults books={searchData} />
    </div>
  );
}

export default App;