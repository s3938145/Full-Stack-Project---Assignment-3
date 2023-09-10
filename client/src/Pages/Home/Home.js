import { Button, ButtonGroup } from "react-bootstrap"
import "./home.css"
import { Link } from "react-router-dom"
import HomeHeader from "../../Components/Header/HomeHeader";

export default function Home() {
    return (
        <div>
            <HomeHeader />
            <ButtonGroup className="container-center" size="lg">
                <p className="title-home">Welcome to our Front Page</p>
                    {/* Go to Admin */}
                    <Link to={'/admin'}>
                        <Button size="lg" variant="primary">
                            Go to Admin Page
                        </Button>
                    </Link>

                    <Link to={'/customer/customerProduct'}>
                        <Button size="lg" variant="primary">
                            Go to Store Front
                        </Button>
                    </Link>
            </ButtonGroup>
        </div>
    )
}