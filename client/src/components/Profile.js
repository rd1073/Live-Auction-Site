import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';




const Profile = () => {

  const [newFullName, setNewFullName] = useState('');
  const [newSellerType, setNewSellerType] = useState('');
  const [newProductsType, setNewProductsType] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const { username } = useParams();
  const [userDetails, setUserDetails] = useState();
  const [products, setProducts] = useState([]);

  const handleUpdateProfile = async () => {
    try {
      
      const response = await axios.put(`http://localhost:4000/updateProfile/${username}`, {
        
        newFullName,
      
        newSellerType,
      
        newProductsType,
      
      });

      console.log('Updated user profile:', response.data);
      
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };







  useEffect(() => {
    // Fetch user details from the server
    axios.get(`http://localhost:4000/profile/${username}`)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [username]);

  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/showproducts/${username}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [username]);



  return (
   
    <div>
       <Navigation />
      
      {userDetails && (
         <div className="d-flex justify-content-center align-items-center">
         <Card style={{ fontSize: '2rem', marginTop:'3rem' }}>
           <Card.Body>
             <Card.Title className="text-center" style={{ fontSize: '4rem' }}>My Details</Card.Title>
             <Card.Text>
               <strong>Username:</strong> {userDetails.username}
             </Card.Text>
             <Card.Text>
               <strong>Email:</strong> {userDetails.email}
             </Card.Text>
             <Card.Text>
               <strong>Full Name:</strong> {userDetails.fullname}
             </Card.Text>
             <Card.Text>
               <strong>What do I sell?</strong> {userDetails.sellertype}
             </Card.Text>
             <Card.Text>
               <strong>My products?</strong> {userDetails.productstype}
             </Card.Text>
   
             <div className="d-flex justify-content-center">
      <Button size="lg" variant="outline-primary"  onClick={handleShow}>
        Update Profile
      </Button>
    </div>
           </Card.Body>
         </Card>
       </div>
         
      )}
      {!userDetails && <p>Loading user and product details...</p>}

      <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
    {products.map((product, index) => (
      <Card key={product._id} style={{ width: '30%', marginRight: '15px', marginBottom: '15px', marginTop: '30px', fontSize : '1rem'}}>
        <Card.Body>
          <Card.Title style={{ fontSize : '2rem' }}>{products[index].title}</Card.Title>
          <Card.Text style={{ fontSize : '1rem' }}>{products[index].description}</Card.Text>
          <Card.Text style={{ fontSize : '1rem' }}>Price: ${products[index].price.toFixed(2)}</Card.Text>
          <Card.Text style={{ fontSize : '1rem' }}>Current Bid: {products[index].currentBid}</Card.Text>
          <Card.Text style={{ fontSize : '1rem' }}>Last Bidder: {products[index].lastbidder}</Card.Text>
          <Card.Text style={{ fontSize: '2rem', color:'green'}}>
                  Your price went up by{' '}
                  {((products[index].currentBid - products[index].price) / products[index].price * 100).toFixed(2)}%
                </Card.Text>
          <hr />
        </Card.Body>
      </Card>
    ))}
  </Container>


  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
             

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name:</Form.Label>
              <Form.Control
                type="text" value={newFullName} onChange={(e) => setNewFullName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Seller Type:</Form.Label>
              <Form.Control
                type="text" value={newSellerType} onChange={(e) => setNewSellerType(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Products:</Form.Label>
              <Form.Control
                type="text" value={newProductsType} onChange={(e) => setNewProductsType(e.target.value)}
              />
            </Form.Group>



          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default Profile
