import './UserBooks.scss';
import { useSelector } from "react-redux";

const UserBooks = () => {
  const books = useSelector(state => state.books);
  console.log(books);
  const booksCopy = [...books];

  return (
    <>
      <h1>Your Books</h1>
      <ul>
        {booksCopy && booksCopy.map((book) => (
          <li key={book.isbn}>
            {book.title}
          </li>
        ))}
      </ul>
    </>
  )
}

export default UserBooks;