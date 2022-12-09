import './Book.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Book = () => {
  const [currentBook, setCurrentBook] = useState(null);

  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const apiKey = process.env.REACT_APP_API_KEY;
  let { id } = useParams();

  useEffect(() => {
    bookById(id);
  }, [id]);

  const bookById = async (bookId) => {
    const response = await axios.get(`${baseUrl}/${bookId}?key=${apiKey}`);
    const data = response.data
    setCurrentBook(data.volumeInfo);
  }

  return (
    <div className="book-container">
      {currentBook ? 
      <div className="book-content">
        <div className="main-info">
          <img className="cover-img" src={currentBook.imageLinks.thumbnail} />
          <div className="main-info-text">
            <h1>{currentBook.title}</h1> 
            <span className="authors">{currentBook.authors}</span>
            <span className="page-count">{currentBook.pageCount} PAGES</span>
            <span className="publisher">Published by {currentBook.publisher}</span>
          </div>
        </div>
        <h2>Description</h2>
        <p dangerouslySetInnerHTML={{ __html: currentBook.description }}></p>
      </div> : '' }
    </div>
  )
}

export default Book;