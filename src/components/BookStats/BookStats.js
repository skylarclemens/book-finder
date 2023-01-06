import './BookStats.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserBook = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const bookState = useSelector(state => state.books);
  const books = [...bookState];
  let { id } = useParams();

  const bookInfo = currentBook?.books;

  useEffect(() => {
    const findBook = books.find(book => book.book_id === Number(id));
    setCurrentBook(findBook);
  }, [id]);

  if(!currentBook) {
    return 'Loading...'
  }

  const progress = currentBook?.pages_read/currentBook.books?.pageCount;

  return (
    <div className="stats-container">
      <h1>{bookInfo.title}</h1>
      <span>{bookInfo.authors}</span>
      <span>{`Current Progress: ${progress}%`}</span>
    </div>
  )
}

export default UserBook;