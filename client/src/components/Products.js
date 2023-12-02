import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


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


  const handleLogout = () => {
    sessionStorage.removeItem('userInfo');

    // Redirect to the login page after logout
    navigate('/login');

  };
  return (
    <div>
      <p></p>
      <h1 style={{ textAlign: 'center',  top: '22%' }}>Products</h1>

      <div className="table__container">
      <Link to="/products/add" className="products__cta">
          ADD PRODUCTS
        </Link>
        <h2>Product List</h2>
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

      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Products;
