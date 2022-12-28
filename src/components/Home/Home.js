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
        <div className="user-welcome">
          <h2>Hello, {user.user_metadata.full_name}!</h2>
        </div>
        <div className="user-reading">
          <span className="small-text">Currently Reading</span>
          <div className="reading-container">
            {booksReading ? booksReading.map(currBook => {
              const book = currBook.books;
              return (
                <div key={book.id} className="book-reading">
                  <Link className="book-list-container" to={`/book/${book.google_id}`}>
                    <div className="book-image-container">
                      <img src={book.image} alt={`${book.title} cover`} />
                    </div>
                    <div className="book-info">
                      <span className="title">{book.title}</span>
                      <span>{book.authors}</span>
                    </div>
                  </Link>
                </div>
              )
              })
            : ''}
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