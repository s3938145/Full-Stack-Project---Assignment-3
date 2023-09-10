import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

function CustomerHeader() {
  const { customerId } = useParams();

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/customer">Customer Dashboard</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/customer">Products</Nav.Link>
        { customerId && <Nav.Link as={Link} to={`/customer/${customerId}`}>Profile</Nav.Link> }
      </Nav>
    </Navbar>
  );
}

export default CustomerHeader;
