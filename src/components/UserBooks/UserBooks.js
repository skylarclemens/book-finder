import './UserBooks.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from '../../reducers/bookReducer';

const UserBooks = () => {
  const books = useSelector(state => state.books);
  const dispatch = useDispatch();
  const booksCopy = [...books];
  const booksReading = booksCopy.filter(book => book.currentlyReading === true);

  const handleReading = (id, readingStatus) => {
    const bookToUpdate = booksCopy.filter(book => book.id === id)[0];
    const updatedBook = {
      ...bookToUpdate,
      currentlyReading: readingStatus
    };
    dispatch(updateBook(updatedBook));
  }

  if(!booksCopy) {
    return 'Loading...';
  }

  return (
    <>
      <h1>My Books</h1>
      <div className={`currently-reading ${!booksReading.length ? 'empty' : ''}`}>
        <h2>Currently Reading</h2>
        <ul className="book-list">
          {booksReading.length ? booksReading.map((book) => (
            <li className="user-book" key={book.isbn}>
              <Link className="book-list-container" to={`/book/${book.id}`}>
                <div className="book-image-container">
                  <img src={book.image} alt={`${book.title} cover`} />
                </div>
                <div className="book-info">
                  <span className="title">{book.title}</span>
                  <span>{book.authors}</span>
                </div>
              </Link>
              <div className="update-button">
                <button onClick={() => handleReading(book.id, false)} className="update-book reading-button">Remove from Reading</button>
              </div>
            </li>
          )) : ''}
        </ul>
      </div>
      <div className={`my-library ${booksCopy.length === booksReading.length ? 'empty' : ''}`}>
        <h2>My Library</h2>
        <ul className={'book-list'}>
          {booksCopy.map((book) => {
            let bookList = null;
            if(!book.currentlyReading) {
              bookList = <li className="user-book" key={book.isbn}>
                <Link className="book-list-container" to={`/book/${book.id}`}>
                  <div className="book-image-container">
                    <img src={book.image} alt={`${book.title} cover`} />
                  </div>
                  <div className="book-info">
                    <span className="title">{book.title}</span>
                    <span>{book.authors}</span>
                  </div>
                </Link>
                <div className="update-button">
                  <button onClick={() => handleReading(book.id, true)} className="update-book">Currently Reading</button>
                </div>
              </li>
            }
            return bookList;
          })}
        </ul>
      </div>
    </>
  )
}

export default UserBooks;