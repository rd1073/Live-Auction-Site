import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';



const Profile = () => {
  
    const { username } = useParams();
  const [userDetails, setUserDetails] = useState();
 
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
    // Fetch user details from the server
    axios.get(`http://localhost:4000/showproducts/${username}`)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
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
      <Button size="lg" variant="outline-primary">
        Update Profile
      </Button>
    </div>
           </Card.Body>
         </Card>
       </div>
         
      )}
      {!userDetails && <p>Loading user details...</p>}
    </div>
  )
}

export default Profile
