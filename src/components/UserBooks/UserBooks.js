import './UserBooks.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { removeBook } from '../../reducers/bookReducer';

const UserBooks = () => {
  const books = useSelector(state => state.books);
  const dispatch = useDispatch();
  const booksCopy = [...books];

  const deleteBook = (id) => {
    dispatch(removeBook(id));
  }

  return (
    <>
      <h1>My Books</h1>
      <ul className="book-list">
        {booksCopy && booksCopy.map((book) => (
          <li className="user-book" key={book.isbn}>
            <Link className="book-list-container" to={`/book/${book.id}`}>
              <div className="book-image-container">
                <img src={book.image} />
              </div>
              <div className="book-info">
                <span className="title">{book.title}</span>
                <span>{book.authors}</span>
              </div>
            </Link>
            <div className="remove-button">
              <button onClick={() => deleteBook(book.id)} className="remove-book">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserBooks;