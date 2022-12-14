import './Search.scss';
import { useEffect, useState, useRef } from "react";
import { Link } from 'react-router-dom';
import useClickOut from '../../hooks/useClickOut';
import axios from "axios";



const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const searchResults = useRef(null);
  useClickOut(searchResults, () => {
    setSearchData([]);
  });

  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const apiKey = process.env.REACT_APP_GOOGLE_KEY;
  const inputTimer = 1000;

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
      }, inputTimer);

      return () => clearTimeout(debouncer);
    } else {
      setSearchData([]);
      return;
    }
  }, [searchText]);

  const handleLinkClick = () => {
    setSearchText("");
    setSearchData([]);
  }

  return (
    <div className="search-container">
      <input type="search" placeholder="Search" name="search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <ul ref={searchResults} className={`searchResults ${searchData.length ? '' : 'empty'}`}>
        {searchData.map((book) => {
          const coverImage = book.volumeInfo?.imageLinks?.thumbnail;
          const listItem = book.volumeInfo.title ? 
            <li key={book.id}>
              <Link onClick={handleLinkClick} to={`/book/${book.id}`}>
                <div className="book-item">
                  <div className="book-image-container">
                    <div className={`book-image ${!coverImage && 'missing'}`} />
                    <img className={`book-image ${!coverImage && 'missing'}`} src={book.volumeInfo?.imageLinks?.thumbnail} alt={`${book.volumeInfo.title} cover`} />
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