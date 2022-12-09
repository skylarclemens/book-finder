import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import './Search.scss';


const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);

  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const apiKey = process.env.REACT_APP_API_KEY;

  // GET search results when user has stopped typing for 2 seconds
  useEffect(() => {
    if(searchText.length) {
      const handleSearch = () => {
        axios.get(`${baseUrl}?q=${searchText}&key=${apiKey}`)
        .then((res) => {
          setSearchData(res.data.items);
        });
      }

      let debouncer = setTimeout(() => {
        handleSearch();
      }, 1500);

      return () => clearTimeout(debouncer);
    } else {
      setSearchData([]);
      return;
    }
  }, [searchText]);

  return (
    <div className="search-container">
      <input type="text" placeholder="Search" name="search" onChange={(e) => setSearchText(e.target.value)} />
      <ul className={`searchResults ${searchData.length ? '' : 'empty'}`}>
        {searchData.map((book) => {
          const listItem = book.volumeInfo.title ? 
            <li key={book.id}>
              <Link to={`/book/${book.id}`}>
                <div className="book-item">
                  <div className="book-image-container">
                    <img className="book-image" src={book.volumeInfo.imageLinks.smallThumbnail} alt={`${book.volumeInfo.title} cover`} />
                  </div>
                  <div className="book-info">
                    <span className="title">{book.volumeInfo.title}</span>
                    <span>{book.volumeInfo.authors}</span>
                  </div>
                </div>
              </Link>
            </li> : '';
          return listItem;
        })}
      </ul>
    </div>
  )
}

export default Search;