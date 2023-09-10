import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function SellerHeader() {
  const token = localStorage.getItem('token');
  let sellerId;
  
  if (token) {
    sellerId = jwt_decode(token).id;
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/seller/dashboard">Seller Dashboard</Navbar.Brand>
      <Nav className="mr-auto">
        {/* Link to Home */}
        <Nav.Link as={NavLink} to="/" exact className={({ isActive }) => isActive ? 'active' : ''}>
          Home
        </Nav.Link>

        {/* Link to Products Management */}
        <Nav.Link as={NavLink} to="/seller/products" className={({ isActive }) => isActive ? 'active' : ''}>
          Products
        </Nav.Link>

        {/* Conditional rendering for Profile link based on the availability of sellerId */}
        {sellerId && 
          <Nav.Link as={NavLink} to={`/seller/dashboard`} className={({ isActive }) => isActive ? 'active' : ''}>
            Profile
          </Nav.Link>
        }

        {/* Link to Add New Product */}
        <Nav.Link as={NavLink} to="/seller/products/add" className={({ isActive }) => isActive ? 'active' : ''}>
          Add Product
        </Nav.Link>

        {/* Logout Link */}
        <Nav.Link as={NavLink} to="/seller/logout" className={({ isActive }) => isActive ? 'active' : ''}>
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default SellerHeader;
