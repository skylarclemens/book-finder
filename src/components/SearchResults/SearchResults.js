import './SearchResults.scss';

const SearchResults = ({ books }) => {
  return (
    <ul className={`searchResults ${books.length ? '' : 'empty'}`}>
      {books.map((book) => (
          <li className="book-item" key={book.id}>
            <div className="book-image-container">
              <img className="book-image" src={book.volumeInfo.imageLinks.smallThumbnail} />
            </div>
            <div className="book-info">
              <span className="title">{book.volumeInfo.title}</span>
              <span>{book.volumeInfo.authors[0]}</span>
            </div>
          </li>
        )
      )}
    </ul>
  )
}

export default SearchResults;