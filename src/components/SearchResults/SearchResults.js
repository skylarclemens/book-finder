import './SearchResults.scss';
import { Link } from 'react-router-dom';

const SearchResults = ({ books }) => {
  return (
    <ul className={`searchResults ${books.length ? '' : 'empty'}`}>
      {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              <div className="book-item">
                <div className="book-image-container">
                  <img className="book-image" src={book.volumeInfo.imageLinks.smallThumbnail} alt={`${book.volumeInfo.title} cover`} />
                </div>
                <div className="book-info">
                  <span className="title">{book.volumeInfo.title}</span>
                  <span>{book.volumeInfo.authors[0]}</span>
                </div>
              </div>
            </Link>
          </li>
        )
      )}
    </ul>
  )
}

export default SearchResults;