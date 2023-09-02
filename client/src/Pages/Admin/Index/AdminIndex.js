import React from 'react';
import './adminIndex.css';
function AdminIndex() {
  return (
    <div className='index-instructions'>
        <h3>Welcome to the Admin Dashboard</h3>
        <ul>
            <li> Select 'Categories' to view the list of available categories </li>
            <li> Select 'Sellers' to view</li>
        </ul>
    </div>
  )
}

export default AdminIndex