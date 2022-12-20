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
  const coverImage = currentBook?.imageLinks?.thumbnail.replace('&edge=curl', '');

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
      isbn: currentBook.industryIdentifiers[1].identifier,
      currentlyReading: false
    }
    dispatch(appendBook(newBook));
  }

  if(!currentBook) {
    return 'Loading...';
  }

  return (
    <div className="book-container">
      <div className="book-content">
        <div className="main-info">
          <div className={`cover-img ${!coverImage ? 'missing' : 'exists'}`} />
          <img className={`cover-img ${!coverImage ? 'missing' : ''}`} src={coverImage} />
          <div className="main-info-text">
            <div className="title-container">
              <h1>{currentBook.title}</h1>
              {!inLibrary ?
                <button type="button" className="add-button" onClick={() => addBook()}>Add to your Books</button> :
                <button type="button" className="add-button exists">In your Library</button>
              }
            </div>
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
          <div className="description-text" dangerouslySetInnerHTML={{ __html: currentBook.description }}></div>
        </div>
      </div>
    </div>
  )
}

export default Book;