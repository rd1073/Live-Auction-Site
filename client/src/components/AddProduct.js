import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
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
    try{
 
     console.log({ title, description, price, seller: userInfo.username });
     

    } catch(error){
      console.log(error);
    }
       
    navigate('/products');
  };

  return (
    <div>
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