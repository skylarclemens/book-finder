import './Book.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from './Rating/Rating';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { appendBook, removeBook } from '../../reducers/bookReducer';
import { supabase } from '../../supabaseClient';

const Book = () => {
  const [currentBook, setCurrentBook] = useState(null);
  const [showText, setShowText] = useState(false);
  const userBooks = useSelector(state => state.books);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const apiKey = process.env.REACT_APP_GOOGLE_KEY;
  let { id } = useParams();

  const inLibrary = userBooks.filter(book => book?.books?.google_id === id);
  const coverImage = currentBook?.imageLinks?.thumbnail.replace('&edge=curl', '');

  useEffect(() => {
    const bookById = async (bookId) => {
      const response = await axios.get(`${baseUrl}/${bookId}?key=${apiKey}`);
      const data = response.data
      setCurrentBook(data.volumeInfo);
    }
    bookById(id);
  }, [id]);

  const addBook = async () => {
    const newBook = {
      google_id: id,
      title: currentBook.title,
      subtitle: currentBook.subtitle,
      description: currentBook.description,
      authors: currentBook.authors,
      publisher: currentBook.publisher,
      pageCount: currentBook.pageCount,
      image: currentBook?.imageLinks?.thumbnail.replace('&edge=curl', ''),
      isbn: currentBook.industryIdentifiers
    }

    const { data, error } = await supabase.from('books').upsert(newBook, {
      onConflict: 'google_id', ignoreDuplicates: false,
    }).select();

    if(error) {
      console.error(error);
      return;
    }

    addUserBook(data[0].id, user.id, data[0])
  }

  const addUserBook = async (bookId, userId, bookData) => {
    const newUserBook = {
      book_id: bookId,
      user_id: userId,
      page_count: bookData?.pageCount
    }

    const { data, error } = await supabase.from('user_book').insert(newUserBook).select();

    if(error) {
      console.error(error);
      return;
    }

    const userBookData = data[0];

    dispatch(appendBook({
      ...userBookData,
      books: bookData
    }));
  }

  const deleteBook = async (bookId) => {
    try {
      const { error } = await supabase
      .from('user_book')
      .delete()
      .eq('book_id', bookId);

      if(error) throw error;

      dispatch(removeBook(bookId));
    } catch (error) {
      console.error(error);
    }
  }

  if(!currentBook) {
    return 'Loading...';
  }

  return (
    <div className="book-container">
      <div className="book-content">
        <div className="main-info">
          <div className="book-left">
            <div className={`cover-img ${!coverImage ? 'missing' : 'exists'}`} />
            <img className={`cover-img ${!coverImage ? 'missing' : ''}`} src={coverImage} />
            <Rating />
          </div>
          <div className="book-right">
            <div className="book-info">
              <h1>{currentBook.title}</h1>
              <span className="authors">{currentBook.authors}</span>
              <span className="page-count uppercase">{currentBook.pageCount} Pages</span>
              <span className="publisher uppercase">Published by {currentBook.publisher}</span>
            </div>
            {!inLibrary.length ?
                <button type="button" className="add-button" onClick={() => addBook()}>Add to your Books</button> :
                <button type="button" className="remove-button" onClick={() => deleteBook(currentBook.id)}>
                  <span className="default-text">In your Library</span>
                  <span className="hover-text">Remove</span>
                </button>
            }
            <div className="isbn uppercase">
              {currentBook.industryIdentifiers.map((isbn) => (
                <span key={isbn.identifier}>{isbn.type}: {isbn.identifier}</span>
              ))}
            </div>
            <div className="break"></div>
            <div className="description">
              <h2 className="description-heading">Description</h2>
              <div className={`description-text ${showText ? 'show' : 'hide'}`} dangerouslySetInnerHTML={{ __html: currentBook.description }}></div>
              <button className="description-show-more" onClick={() => setShowText(!showText)}>Show {`${showText ? 'Less' : 'More'}`}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book;