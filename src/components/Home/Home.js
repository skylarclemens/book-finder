import './Home.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookCard from './BookCard/BookCard';

const Home = () => {
  const books = useSelector(state => state.books);
  const user = useSelector(state => state.user);

  const booksReading = books ? books.filter(book => book.tag === 'currently-reading') : null;
  const booksLibrary = books ? books.filter(book => book.tag === null) : null;
  const booksComplete = books ? books.filter(book => book.tag === 'complete') : null;
  let userWelcome = null;

  if(user) {
    userWelcome = (
      <div className="home-container">
        <div className="user-reading section">
          <div className="home-heading">
            <div className="heading-emoji">📖</div>
            <div className="heading-text">
              <h2>READING</h2>
              <span className="small-text">{`${booksReading ? booksReading.length : '0'} book${booksReading.length > 1 ? 's' : ''}`}</span>
            </div>
          </div>
          <div className="card-container">
            {booksReading ? booksReading.map(currBook => <BookCard key={currBook.id} book={currBook} />) : ''}
          </div>
        </div>
        <div className="library section">
          <div className="home-heading">
            <div className="heading-emoji">📚</div>
            <div className="heading-text">
              <h2>LIBRARY</h2>
              <span className="small-text">{`${booksLibrary ? booksLibrary.length : '0'} book${booksLibrary.length > 1 ? 's' : ''}`}</span>
            </div>
          </div>
          <div className="card-container">
            {booksLibrary ? booksLibrary.map(currBook => <BookCard key={currBook.id} book={currBook} />) : ''}
          </div>
        </div>
        <div className="completed section">
          <div className="home-heading">
            <div className="heading-emoji">🎉</div>
            <div className="heading-text">
              <h2>COMPLETED</h2>
              <span className="small-text">{`${booksComplete ? booksComplete.length : '0'} book${booksComplete.length > 1 ? 's' : ''}`}</span>
            </div>
          </div>
          <div className="card-container">
            {booksComplete ? booksComplete.map(currBook => <BookCard key={currBook.id} book={currBook} />) : ''}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {userWelcome}
    </>
  )
}

export default Home;