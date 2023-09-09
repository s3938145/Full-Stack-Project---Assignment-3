import { Button, ButtonGroup } from "react-bootstrap"
import "./home.css"
import { Link } from "react-router-dom"
import { useAuth } from "../../Components/Authentication/authProvider";

export default function Home() {
    const { token } = useAuth();
    
    if (!token) {
            <Link to={'/login'}>
                <Button size="lg" variant="primary">
                    Login 
                </Button>
            </Link>
    } else {
        <Link to={'/login'}>
            <Button size="lg" variant="primary">
                Login 
            </Button>
        </Link>
    }

    return (
        <div>
            <ButtonGroup className="container-center" size="lg">
                <p className="title-home">Welcome to our Front Page</p>
                    {/* Go to Admin */}
                    <Link to={'/admin'}>
                        <Button size="lg" variant="primary">
                            Go to Admin Page
                        </Button>
                    </Link>

                    {/* Go to Seller's Page */}
                    <Link to={'/seller/dashboard'}>
                        <Button size="lg" variant="primary">
                            Go to Seller Page
                        </Button>
                    </Link>


                <ButtonGroup className="login-register">
                    {/* Go to Log in Page */}

                    {(token === null) ? 
                        <Link to={'/login'}>
                            <Button size="lg" variant="primary">
                                Login 
                            </Button>
                        </Link>
                    : 
                        <Link to={'/logout'}>
                            <Button size="lg" variant="primary">
                                Logout 
                            </Button>
                        </Link>
                    }

                    {/* Go to Register Page */}
                    <Link to={'/register'}>
                        <Button size="lg" variant="secondary">
                            Register
                        </Button>
                    </Link>


                </ButtonGroup>
                    <Link to={'/'}>
                        <Button size="lg" variant="primary">
                            Go to Store Front
                        </Button>
                    </Link>
            </ButtonGroup>
        </div>
    )
}