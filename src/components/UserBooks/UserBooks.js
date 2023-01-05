import './UserBooks.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from '../../reducers/bookReducer';
import { supabase } from '../../supabaseClient';

const UserBooks = () => {
  const books = useSelector(state => state.books);
  const dispatch = useDispatch();
  const booksCopy = [...books];
  const booksReading = booksCopy.filter(book => book.tag === 'currently-reading');

  const handleReading = async (id, readingStatus) => {
    const bookToUpdate = booksCopy.filter(book => book.books.id === id)[0];

    const { error } = await supabase
      .from('user_book')
      .update({ tag: readingStatus })
      .eq('book_id', id);
    
    if(error) {
      console.error(error);
      return;
    }

    const updatedBook = {
      ...bookToUpdate,
      tag: readingStatus
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
          {booksReading.length ? booksReading.map((currBook) => {
            const bookInfo = currBook.books
            const progress = currBook.pages_read/bookInfo.pageCount;
            return (
              <li className="user-book" key={bookInfo.id}>
                <Link className="book-list-container" to={`/my-books/${bookInfo.id}`}>
                  <div className="book-image-container">
                    <img src={bookInfo.image} alt={`${bookInfo.title} cover`} />
                  </div>
                  <div className="book-info">
                    <span className="title">{bookInfo.title}</span>
                    <span>{bookInfo.authors}</span>
                  </div>
                </Link>
                <div className="book-progress">
                  {`${progress}%`} 
                </div>
              </li>
            )
          }) : ''}
        </ul>
      </div>
      <div className={`my-library ${booksCopy.length === booksReading.length ? 'empty' : ''}`}>
        <h2>My Library</h2>
        <ul className={'book-list'}>
          {booksCopy.map((currBook) => {
            let bookList = null;
            if(currBook.tag !== 'currently-reading') {
              const book = currBook.books;
              bookList = <li className="user-book" key={book.id}>
                <Link className="book-list-container" to={`/my-books/${book.id}`}>
                  <div className="book-image-container">
                    <img src={book.image} alt={`${book.title} cover`} />
                  </div>
                  <div className="book-info">
                    <span className="title">{book.title}</span>
                    <span>{book.authors}</span>
                  </div>
                </Link>
                <div className="update-button">
                  <button onClick={() => handleReading(book.id, 'currently-reading')} className="update-book">Want to Read</button>
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