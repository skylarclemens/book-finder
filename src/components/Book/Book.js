import './Book.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Book = () => {
  const [currentBook, setCurrentBook] = useState(null);

  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const apiKey = process.env.REACT_APP_GOOGLE_KEY;
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
            <span className="page-count uppercase">{currentBook.pageCount} Pages</span>
            <span className="publisher uppercase">Published by {currentBook.publisher}</span>
            <div className="isbn uppercase">
              {currentBook.industryIdentifiers.map((isbn) => (
                <span key={isbn.identifier}>{isbn.type}: {isbn.identifier}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="break"></div>
        <div className="description">
          <h2 className="description-heading">Description</h2>
          <p className="description-text" dangerouslySetInnerHTML={{ __html: currentBook.description }}></p>
        </div>
      </div> : '' }
    </div>
  )
}

export default Book;