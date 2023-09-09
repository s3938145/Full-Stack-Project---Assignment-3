import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function AdminHeader() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand> Admin Dashboard </Navbar.Brand>
                    <Nav className="me-auto">
                        {/* Link to Categories Page */}
                        <Nav.Link
                            as={NavLink}
                            to="/admin/categories"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }   
                        >
                            Categories
                        </Nav.Link>

                        {/* Link to Seller Approval Page */}
                        <Nav.Link
                            as={NavLink}
                            to="/sellerUpdate"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }   
                        >
                            Sellers
                        </Nav.Link>

                    </Nav>
                </Container>
            </Navbar>
        </>
    )
};