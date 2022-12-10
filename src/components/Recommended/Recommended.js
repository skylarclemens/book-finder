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
    const response = await axios.get(`${baseUrl}/lists/overview.json?api-key=${apiKey}`);
    setBestSellersData(response.data.results.lists);
  }

  // Get list of Best Sellers from NYT
  useEffect(() => {
    if(!bestSellersData.length) {
      getBooks();
    }
  }, [])

  // Use Google Books API to get info for each best seller
  useEffect(() => {
    if(bestSellersData.length) {
      const books = bestSellersData[0].books.map((book) => {
        return axios.get(`${googleBaseUrl}?q=isbn:${book.primary_isbn13}&key=${googleApiKey}`)
          .then(resp => {
            return resp.data.items[0];
          })
        });
      Promise.all(books).then(ar => setBestSellers(ar)); 
    }
  }, [bestSellersData])

  return (
      <>
        <h1>Best Sellers</h1>
        {bestSellers.length ?
          <ul className="best-sellers">
            {bestSellers.map((book) => (
              <li key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <div className="bs-list-item">
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={`${book.volumeInfo.title} cover`} />
                    
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