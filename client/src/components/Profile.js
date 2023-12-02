import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Profile = () => {
    const { username } = useParams();
  const [userDetails, setUserDetails] = useState();
 
  useEffect(() => {
    // Fetch user details from the server
    axios.get(`http://localhost:4000/${username}`)
      .then((response) => {
        setUserDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [username]);
  return (
    <div>
      <h2>User Profile</h2>
      {userDetails && (
        <div>
          <p>Username: {userDetails.username}</p>
          <p>Email: {userDetails.email}</p>
          {/* Add other user details you want to display */}
        </div>
      )}
      {!userDetails && <p>Loading user details...</p>}
    </div>
  )
}

export default Profile
