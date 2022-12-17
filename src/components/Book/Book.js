import './Book.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { appendBook } from '../../reducers/bookReducer';

const Book = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const userBooks = useSelector(state => state.books);
  const dispatch = useDispatch();

  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const apiKey = process.env.REACT_APP_GOOGLE_KEY;
  let { id } = useParams();

  const inLibrary = (userBooks.filter(book => book.id === id).length > 0);

  useEffect(() => {
    bookById(id);
  }, [id]);

  const bookById = async (bookId) => {
    const response = await axios.get(`${baseUrl}/${bookId}?key=${apiKey}`);
    const data = response.data
    setCurrentBook(data.volumeInfo);
  }

  const addBook = () => {
    const newBook = {
      id: id,
      title: currentBook.title,
      subtitle: currentBook.subtitle,
      description: currentBook.description,
      authors: currentBook.authors,
      publisher: currentBook.publisher,
      pageCount: currentBook.pageCount,
      image: currentBook?.imageLinks?.thumbnail.replace('&edge=curl', ''),
      isbn: currentBook.industryIdentifiers[1].identifier
    }
    dispatch(appendBook(newBook));
  }

  return (
    <div className="book-container">
      {currentBook ? 
      <div className="book-content">
        <div className="main-info">
          <img className="cover-img" src={currentBook.imageLinks.thumbnail.replace('&edge=curl', '')} />
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
        {!inLibrary ?
          <button type="button" className="add-button" onClick={() => addBook()}>Add to your Books</button> :
          <button type="button" className="add-button exists">In your Library</button>
        }
        
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