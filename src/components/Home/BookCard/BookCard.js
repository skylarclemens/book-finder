import './BookCard.scss';
import { Link } from 'react-router-dom';

const BookCard = ({ booksList }) => {
  return (
    <div className="card-container">
      {booksList ? booksList.map(currBook => {
        const book = currBook.books;
        const percent = Math.floor(currBook?.pages_read/book?.pageCount*100);
        return (
          <div key={book.id} className="book-reading">
            <Link className="book-card" to={`/my-books/${book.id}`}>
              <div className="book-card-image">
                <img src={book.image} alt={`${book.title} cover`} />
              </div>
              <div className="book-card-info">
                <div className="main-info">
                  <span className="info-title">{book.title}</span>
                  <span className="info-authors">{book.authors}</span>
                </div>
                <div className="info-progress">
                  <span className="percent">{`${percent}%`}</span>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${percent}%`}}></div>
                  </div>
                  <span className="small-text">{`page ${currBook?.pages_read} of ${book?.pageCount}`}</span>
                </div>
              </div>
            </Link>
          </div>
        )
        })
      : ''}
    </div>
  )
}

export default BookCard;