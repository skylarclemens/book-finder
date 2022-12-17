import { useEffect, useState } from "react";
import axios from "axios";
import "./Recommended.scss";
import { Link } from "react-router-dom";

const Recommended = () => {
  const [bestSellersData, setBestSellersData] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const apiKey = process.env.REACT_APP_NYT_KEY;
  const baseUrl = 'https://api.nytimes.com/svc/books/v3/';

  const googleBaseUrl = "https://www.googleapis.com/books/v1/volumes";
  const googleApiKey = process.env.REACT_APP_GOOGLE_KEY;

  const getBooks = async () => {
    const response = await axios.get(`${baseUrl}/lists/current/combined-print-and-e-book-fiction.json?api-key=${apiKey}`);
    setBestSellersData(response.data.results.books);
  }

  // Get list of Best Sellers from NYT
  useEffect(() => {
    if(localStorage.getItem("bestSellers") === null) {
      getBooks();
    } else {
      const storageBestSellers = JSON.parse(localStorage.getItem("bestSellers"));
      setBestSellers(storageBestSellers);
    }
  }, [])

  // Use Google Books API to get info for each best seller
  useEffect(() => {
    if(bestSellersData.length) {
      const books = bestSellersData.map((book) => {
        return axios.get(`${googleBaseUrl}?q=isbn:${book.isbns[0].isbn13}&key=${googleApiKey}`)
          .then(resp => {
            if(resp.data.totalItems > 0) {
              return resp.data.items[0];
            }
            return null;
          })
        });
      Promise.all(books).then(ar => {
        const arCopy = ar.filter(b => b);
        setBestSellers(arCopy);
        localStorage.setItem("bestSellers", JSON.stringify(arCopy));
      });
    }
  }, [bestSellersData])

  if(!bestSellers.length) {
    return (
      <>
        <h1>Best Sellers</h1>
        <span>Loading...</span>
      </>
    );
  }

  return (
      <>
        <h1>Best Sellers</h1>
        {bestSellers.length ?
          <ul className="best-sellers">
            {bestSellers.map((book) => (
              <li key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <div className="bs-list-item">
                    <img src={book.volumeInfo?.imageLinks?.thumbnail.replace('&edge=curl', '')} alt={`${book.volumeInfo.title} cover`} />
                    
                  </div>
                </Link>
              </li>
            ))}
          </ul> : ''
        }
      </>
  )
}

export default Recommended;