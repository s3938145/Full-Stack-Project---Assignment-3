import React from "react";
import { Button } from "react-bootstrap";
import { Link, useRouteError } from "react-router-dom";

export default function NotFound() {
    const err = useRouteError();
    console.log(err);

    return(
        <div className="container-body">
            <h1>Oops! The page you accessed does not exist</h1>
            <div>
                <Link to="/">
                    <Button size="lg">
                        Back to Front Page
                    </Button>
                </Link>
            </div>
        </div>
    )
}