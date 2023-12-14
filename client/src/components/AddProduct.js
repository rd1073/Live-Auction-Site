import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


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
        {/*<form className="addProduct__form" >
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
  </form>*/}
  <div className="addProduct__form">
   <Form>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Product Name:</Form.Label>
        <Form.Control type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            />
            
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formGroupEmail">

      <Form.Label>Product Description:</Form.Label>

      <Form.Control  
       as="textarea"  // Use textarea for multiline input
       rows={4}     
       
       name="description"
            value={description}
            type="description"

            onChange={(e) => setDescription(e.target.value)}
            style={{ width: '70%' }}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupEmail">

      <Form.Label>Prics:</Form.Label>

      <Form.Control  type="number"
            name="startingBid"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
 />
      </Form.Group>
      <button type="button" onClick={handleAdd}>
        ADD A PRODUCT
      </button>
    </Form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;