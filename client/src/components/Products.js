import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { styled } from '@mui/system';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';


const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleBidBtn = (product) =>
  navigate(`/products/bid/${product.title}/${product.price}`);


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
 
          
        {/*<Container>
      <Table striped bordered hover responsive>
        <tbody>
          {products.map((product, index) => (
            // Create a new row for every third product
            index % 3 === 0 ? (
              <tr key={product._id} style={{ width: '30%', paddingRight: '30%' }}>
                {[0, 1, 2].map((offset) => (
                  <td key={offset}>
                    {products[index + offset] && (
                      <Card>
                        <Card.Body>
                          <Card.Title>{products[index + offset].title}</Card.Title>
                          <Card.Text>{products[index + offset].description}</Card.Text>
                          <Card.Text>Price: ${products[index + offset].price.toFixed(2)}</Card.Text>
                          <Card.Text>Seller: {products[index + offset].seller}</Card.Text>
                          <Card.Text>Current Bid: {products[index + offset].currentBid}</Card.Text>
                          <Card.Text>Last Bidder: {products[index + offset].lastbidder}</Card.Text>

                          <Button variant="info" // Use Bootstrap variant classes
                            style={{ marginTop: '10px !important' }} onClick={() => handleBidBtn(products[index + offset])}>BID</Button>
                          <hr />
                        </Card.Body>
                      </Card>
                    )}
                  </td>
                ))}
              </tr>
            ) : null
          ))}
        </tbody>
      </Table>
                    </Container>*/}
               <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
    {products.map((product, index) => (
      <Card key={product._id} style={{ width: '30%', marginRight: '15px', marginBottom: '15px', marginTop: '30px', fontSize : '1rem'}}>
        <Card.Body>
          <Card.Title style={{ fontSize : '2rem' }}>{products[index].title}</Card.Title>
          <Card.Text style={{ fontSize : '1rem' }}>{products[index].description}</Card.Text>
          <Card.Text style={{ fontSize : '1rem' }}>Price: ${products[index].price.toFixed(2)}</Card.Text>
          <Card.Text style={{ fontSize : '1rem' }}>Seller: {products[index].seller}</Card.Text>
          <Card.Text style={{ fontSize : '1rem' }}>Current Bid: {products[index].currentBid}</Card.Text>
          <Card.Text style={{ fontSize : '1rem' }}>Last Bidder: {products[index].lastbidder}</Card.Text>

          <Button
            variant="info"
            style={{ marginTop: '10px', fontSize : '2rem' }}
            onClick={() => handleBidBtn(products[index])}
          >
            BID
          </Button>
          <hr />
        </Card.Body>
      </Card>
    ))}
  </Container>
 
       
      </div>
      </div>

 
     
  )
}

export default Products;
