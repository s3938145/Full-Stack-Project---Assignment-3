import { useState } from "react";
import { Form, Button } from "react-bootstrap";

import './login.css';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        // Email Field
        <Form className="login_container" onSubmit={handleSubmit}>
            <div className="login_title">Login</div>
            <Form.Group className="login_input" size="lg" controlId="email">
                <Form.Control 
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            {/* Password Field */}
            <Form.Group className="login_input" size="lg" controlId="password">
                <Form.Control 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <div className="login_input">
                <Button
                    className="login_button"
                    type="submit"
                    disabled={!validateForm}
                >
                    Sign in
                </Button>
            </div>
            <div className="login_links">
                <div className="login_link_ctr">Create an account</div>
                <div className="login_link_reg">Forgot your password?</div>
            </div>
        </Form>
    )
}