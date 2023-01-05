import './Home.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const books = useSelector(state => state.books);
  const user = useSelector(state => state.user);

  const booksReading = books ? books.filter(book => book.tag === 'currently-reading') : null;
  let userWelcome = null;

  if(user) {
    userWelcome = (
      <>
        <div className="user-reading section">
          <div className="home-heading">
            <div className="heading-emoji">📖</div>
            <div className="heading-text">
              <h2>READING</h2>
              <span className="small-text">{`${booksReading ? booksReading.length : '0'} book${booksReading.length > 1 ? 's' : ''}`}</span>
            </div>
          </div>
          <div className="card-container">
            {booksReading ? booksReading.map(currBook => {
              const book = currBook.books;
              const progress = currBook?.pages_read/book?.pageCount;
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
                        <span className="percent">{`${progress}%`}</span>
                        <div className="progress-bar"></div>
                        <span className="small-text">{`page ${currBook?.pages_read} of ${book?.pageCount}`}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )
              })
            : ''}
          </div>
        </div>
        <div className="library section">
          <div className="home-heading">
          <div className="heading-emoji">📚</div>
            <div className="heading-text">
              <h2>LIBRARY</h2>
            </div>
          </div>
        </div>
        <div className="completed section">
          <div className="home-heading">
            <div className="heading-emoji">🎉</div>
            <div className="heading-text">
              <h2>COMPLETED</h2>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {userWelcome}
    </>
  )
}

export default Home;