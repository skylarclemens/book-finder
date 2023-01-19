import './BookStats.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import { updateBook } from '../../reducers/bookReducer';

const UserBook = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const [newProgress, setNewProgress] = useState('');
  const [openUpdate, setOpenUpdate] = useState(false);
  const bookState = useSelector(state => state.books);
  const books = [...bookState];
  let { id } = useParams();
  const dispatch = useDispatch();

  const bookInfo = currentBook?.books;
  const findBook = books.find(book => book.book_id === Number(id));

  useEffect(() => {
    setCurrentBook(findBook);
  }, [id]);

  if(!currentBook) {
    return 'Loading...'
  }

  const progress = Math.floor(currentBook?.pages_read/bookInfo.pageCount*100);

  const updateProgess = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('user_book')
      .update({ pages_read: Number(newProgress)})
      .eq('book_id', id);
    
    if(error) {
      console.error(error);
      return;
    }

    const updatedBook = {
      ...currentBook,
      pages_read: Number(newProgress)
    };

    dispatch(updateBook(updatedBook));
    setCurrentBook(updatedBook);
    setNewProgress('');
    setOpenUpdate(false);
  }

  return (
    <div className="stats-container">
      <div className="stats-image">
        <img src={bookInfo.image} alt={`${bookInfo.title} cover`} />
      </div>
      <div className="stats-info">
        <h1 className="info-title">{bookInfo.title}</h1>
        <span>{bookInfo.authors}</span>
        <div className="info-progress">
          <span className="percent">{`${progress}%`}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${progress}%`}}></div>
          </div>
          <span className="small-text">{`page ${currentBook?.pages_read} of ${bookInfo?.pageCount}`}</span>
        </div>
        <div className="update-progress">
          <button type="button" onClick={() => setOpenUpdate(!openUpdate)}>Update progress</button>
          <form onSubmit={updateProgess} className={`update-form ${openUpdate ? 'open' : ''}`}>
            <span>Page</span>
            <input value={newProgress} onChange={(e) => setNewProgress(e.target.value)}/>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserBook;