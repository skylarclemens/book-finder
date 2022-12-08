import './Book.scss';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Book = ({ book }) => {
  const [currentBook, setCurrentBook] = useState(null);

  const baseUrl = "https://www.googleapis.com/books/v1/volumes";
  const apiKey = process.env.REACT_APP_API_KEY;
  let { id } = useParams();

  useEffect(() => {
    bookById(id);
  }, [id]);

  const bookById = async (bookId) => {
    const response = await axios.get(`${baseUrl}/${bookId}?key=${apiKey}`);
    setCurrentBook(response.data);
  }

  return (
    <>
      { currentBook ? currentBook.volumeInfo.title : '' }
    </>
  )
}

export default Book;