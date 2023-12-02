import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');

    // Redirect to the login page after logout
    navigate('/login');

  };
  return (
    <div>
      <h1>Home Page</h1>
      <div className="table__container">
      <Link to="/products/add" className="products__cta">
          ADD PRODUCTS
        </Link>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Last Bidder</th>
              <th>Creator</th>
              <th>Edit</th>
            </tr>
          </thead>
          {/* Data for display, we will later get it from the server */}
          <tbody>
            <tr>
              <td>Tesla Model S</td>
              <td>$30,000</td>
              <td>@david_show</td>
              <td>@elon_musk</td>
              <td>
                <button>Edit</button>
              </td>
            </tr>

            <tr>
              <td>Ferrari 2021</td>
              <td>$50,000</td>
              <td>@bryan_scofield</td>
              <td>@david_asaolu</td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <button onClick={handleLogout}>Logout</button>

    </div>
  )
}

export default Home
