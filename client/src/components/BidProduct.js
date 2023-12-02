import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import axios from "axios";


const BidProduct = ({ socket }) => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
  const { title, price } = useParams();


   const [userInput, setUserInput] = useState();

  const navigate = useNavigate();
  const [error, setError] = useState(false);



  const handleBid = (e) => {
    e.preventDefault();
    if (userInput > Number(price)) {
      socket.emit('bidProduct', {
        userInput,
        lastbidder: userInfo.username,
        title,
      });
      navigate('/products');
    } else {
      setError(true);
    }
   };

  return (
    <div>
       <Navigation />

      <div className="bidproduct__container">
        <h2>Place a Bid</h2>
        <form className="bidProduct__form" >
          <h3 className="bidProduct__name">{title}</h3>
          <h3 className="bidProduct__name">Starting Price:{price}</h3>


          <label htmlFor="amount">Bidding Amount</label>
         {/* The error message */}
         {error && (
            <p style={{ color: 'red' }}>
              Increse the bidding amount
            </p>
          )}
          <input
            type="number"
            name="amount"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            required
          />

          <button className="bidProduct__cta" onClick={handleBid}>BID</button>
        </form>
      </div>
    </div>
  );
};

export default BidProduct;