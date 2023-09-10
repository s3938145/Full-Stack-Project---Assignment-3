import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function CustomerHeader() {
  const token = localStorage.getItem('token');
  let customerId;
  if(token){
    customerId = jwt_decode(token).id;
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/customer">Customer Dashboard</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/customer">Products</Nav.Link>
        { customerId && <Nav.Link as={Link} to={`/customer/dashboard`}>Profile</Nav.Link> }
        { customerId && <Nav.Link as={Link} to={`/customer/logout`}>Logout</Nav.Link> }
      </Nav>
    </Navbar>
  );
}

export default CustomerHeader;
