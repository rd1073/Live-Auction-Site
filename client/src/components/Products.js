import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

import { styled } from '@mui/system';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBidBtn = (product) =>
  navigate(`/products/bid/${product.title}/${product.price}`);
/*
  useEffect(() => {
    const fetchProducts = () => {
      fetch('http://localhost:4000/api')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data.products);
          setLoading(false);
        });
    };
    fetchProducts();
  }, []);*/

  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:4000/api');
      const data = await response.json();

      // Update state with the fetched products
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };


  

  const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: 4,
    margin: '0 20px', // Adjust the margin values as needed

   
  }));

  return (
    <div>
        
 <Navigation />
      <div className="table__container">
      
        
        <h1 style={{ textAlign: 'center',  top: '22%' }}>Products</h1>

        <Link to="/products/add" className="products__cta">
          ADD PRODUCTS
        </Link>
        <p>   </p>
        <p>   </p>
        <p>   </p>

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Seller: {product.seller}</p>
            <p>Current Bid: {product.currentBid}</p>

            <button onClick={() => handleBidBtn(product)}>Edit</button>

            <hr />
          </li>
        ))}
      </ul>
      </div>

 
    </div>
  )
}

export default Products;
