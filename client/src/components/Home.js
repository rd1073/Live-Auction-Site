import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <div className="table__container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Last Bidder</th>
              <th>Creator</th>
            </tr>
          </thead>
          {/* Data for display, we will later get it from the server */}
          <tbody>
            <tr>
              <td>Tesla Model S</td>
              <td>$30,000</td>
              <td>@david_show</td>
              <td>@elon_musk</td>
            </tr>

            <tr>
              <td>Ferrari 2021</td>
              <td>$50,000</td>
              <td>@bryan_scofield</td>
              <td>@david_asaolu</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
