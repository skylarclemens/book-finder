import './Home.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../reducers/userReducer';


const Home = () => {
  const user = useSelector(state => state.user);
  const books = useSelector(state => state.books);
  const dispatch = useDispatch();

  const booksReading = books.filter(book => book.currentlyReading === true);
  let userWelcome = null;
  
  const handleLogOut = () => {
    dispatch(removeUser());
  }

  if(user) {
    userWelcome = (
      <>
        <div className="user-welcome">
          <h2>Hello, {user.name}!</h2>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
        <div className="user-reading">
          <span className="small-text">Currently Reading</span>
          <div className="reading-container">
            {booksReading ? booksReading.map(book => (
              <div key={book.id} className="book-reading">
                <Link className="book-list-container" to={`/book/${book.id}`}>
                  <div className="book-image-container">
                    <img src={book.image} alt={`${book.title} cover`} />
                  </div>
                  <div className="book-info">
                    <span className="title">{book.title}</span>
                    <span>{book.authors}</span>
                  </div>
                </Link>
              </div>
            ))
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