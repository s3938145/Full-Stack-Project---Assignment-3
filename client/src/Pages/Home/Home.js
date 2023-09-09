import { Button, ButtonGroup } from "react-bootstrap"
import "./home.css"
import { Link } from "react-router-dom"

export default function Home() {
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
                <ButtonGroup className="login-register">
                    {/* Go to Seller's Page */}
                    <Link to={'/login'}>
                        <Button size="lg" variant="primary">
                            Login 
                        </Button>
                    </Link>

                    {/* Go to Customer's Page */}
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