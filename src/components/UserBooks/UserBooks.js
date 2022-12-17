import './UserBooks.scss';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const UserBooks = () => {
  const books = useSelector(state => state.books);
  const booksCopy = [...books];

  return (
    <>
      <h1>My Books</h1>
      <ul>
        {booksCopy && booksCopy.map((book) => (
          <li key={book.isbn}>
            <Link to={`/book/${book.id}`}>
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserBooks;