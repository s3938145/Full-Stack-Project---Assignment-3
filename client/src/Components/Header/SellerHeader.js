import React from 'react'
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function SellerHeader() {
  const token = localStorage.getItem('token');
  let sellerId;
  
  if (token) {
    sellerId = jwt_decode(token).id;
  }

  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
        <Navbar.Brand as={Link} to="/seller/dashboard"> Seller Dashboard </Navbar.Brand>
        <Nav className="me-auto">

            {/* Link to Homepage */}
            <Nav.Link as={Link} to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Home
            </Nav.Link>

            <Nav.Link as={Link} to="/seller/products" className={({ isActive }) => isActive ? 'active' : ''}>
                Products
            </Nav.Link>

            <Nav.Link as={Link} to="/seller/products/add" className={({ isActive }) => isActive ? 'active' : ''}>
                Add new Product
            </Nav.Link>
        </Nav>
    </Container>
</Navbar>
  )
}

export default SellerHeader;
