import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
const AddProduct = ({ socket }) => {
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
 console.log('userInfo:', userInfo);


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');


   
  const navigate = useNavigate();

   const handleAdd = async () => {
     if (!title || !description || !price) {
      console.log("please fill all the fields");
       return;
    }
    
     console.log({ title, description, price, seller: userInfo.username });
     socket.emit('addProduct', {
      title,
      description,
      price,
      seller: userInfo.username,
    });
       
    navigate('/products');
  };

  return (
    <div>
      <Navigation />
      
      <div className="addproduct__container">
        <h1>Add a new product</h1>
        <form className="addProduct__form" >
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}

          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={description}
            type="text"

            onChange={(e) => setDescription(e.target.value)}

          />
        </label>
        <br />
        <label>
          Starting Bid:
          <input
            type="number"
            name="startingBid"
            value={price}
            onChange={(e) => setPrice(e.target.value)}

          />
        </label>
        <br />
        <button type="button" onClick={handleAdd}>
        ADD A PRODUCT
      </button>
      </form>
        
      </div>
    </div>
  );
};

export default AddProduct;