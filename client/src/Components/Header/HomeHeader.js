import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../Authentication/authProvider";
import jwt_decode from "jwt-decode";


export default function HomeHeader() {
    const { token } = useAuth();
    var decoded = {}

    if(token !== null) {
        decoded = jwt_decode(token)
    }

    function HeaderButton({role}) {
        if (role === undefined) {
            return null
        } else if (role === "Customer") {
            return (
                <Nav.Link
                    as={NavLink}
                    to="/customer/customerProduct"
                    className={({ isActive }) =>
                        isActive ? 'active' : ''
                    }   
                >
                    Customer
                </Nav.Link>
            )
        } else if (role === "Seller") {
            return (
                <Nav.Link
                as={NavLink}
                to="/seller/dashboard"
                className={({ isActive }) =>
                    isActive ? 'active' : ''
                }   
                >
                    Seller
                </Nav.Link>
            )
        }
    }


    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand> Home Dashboard </Navbar.Brand>
                    <Nav className="me-auto">

                        {/* Link to Homepage */}
                        <Nav.Link
                            as={NavLink}
                            to="/"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }   
                        >
                            Home
                        </Nav.Link>

                        {(token === null) ?

                        <Nav.Link
                            as={NavLink}
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }   
                        >
                            Login
                        </Nav.Link>
                        :
                        <Nav.Link
                            as={NavLink}
                            to="/logout"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }   
                        >
                            Logout
                        </Nav.Link>
                        }

                        <Nav.Link
                            as={NavLink}
                            to="/register"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }   
                        >
                            Register
                        </Nav.Link>

                        <HeaderButton 
                            role={decoded.role}
                        />
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
};