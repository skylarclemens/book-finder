import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const baseUrl = "https://www.googleapis.com/books/v1/volumes?";
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const handleSearch = () => {
      if(searchText.length) {
        axios.get(`${baseUrl}q=${searchText}&key=${apiKey}`)
        .then((res) => {
          setSearchData(res.data.items);
          console.log('res.data', res.data);
          console.log('searchData', searchData);
        });
      }
    }

    let debouncer = setTimeout(() => {
      handleSearch();
    }, 2000);

    return () => clearTimeout(debouncer);
  }, [searchText]);

  return (
    <>
      <input type="text" name="search" onChange={(e) => setSearchText(e.target.value)}></input>
      <div className="searchResults">
        {searchData.map((book) => {
          return (
            <div key={book.id}>
              {book.volumeInfo.title}
            </div>
          )
        })}
      </div>
    </>
  );
}

export default App;