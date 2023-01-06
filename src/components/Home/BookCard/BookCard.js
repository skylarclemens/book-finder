import './BookCard.scss';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const bookInfo = book.books;
  const percent = Math.floor(book?.pages_read/bookInfo?.pageCount*100);
  return (
    <Link className="book-card" to={`/my-books/${bookInfo.id}`}>
      <div className="book-card-image">
        <img src={bookInfo.image} alt={`${bookInfo.title} cover`} />
      </div>
      <div className="book-card-info">
        <div className="main-info">
          <span className="info-title">{bookInfo.title}</span>
          <span className="info-authors">{bookInfo.authors}</span>
        </div>
        <div className="info-progress">
          <span className="percent">{`${percent}%`}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${percent}%`}}></div>
          </div>
          <span className="small-text">{`page ${book?.pages_read} of ${bookInfo?.pageCount}`}</span>
        </div>
      </div>
    </Link>
  )
}

export default BookCard;