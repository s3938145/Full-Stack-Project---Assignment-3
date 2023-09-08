import { useState } from "react";
import { Form as BsForm, Button } from "react-bootstrap";

import './login.css';
import { signIn } from "../../APIs/authAPI";
import { redirect, Form } from "react-router-dom";

export async function logInUser({ request }) {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
    await signIn(newData);
    return redirect('/')
}

export default function Login() {
    return (
        // Email Field
        <BsForm as={Form} method='post' className="login_container">
            <div className="login_title">Register</div>
            <BsForm.Group className="login_input" controlId="email">
                <BsForm.Control 
                    autoFocus
                    type="email"
                    name="email"
                    placeholder="Email"
                />
            </BsForm.Group>
            {/* Password Field */}
            <BsForm.Group className="login_input" controlId="password">
                <BsForm.Control 
                    type="password"
                    name="password"
                    placeholder="Password"
                />
            </BsForm.Group>

            <div className="login_input">
                <Button
                    className="login_button"
                    as="input"
                    type="submit"
                    value="Login"
                />
            </div>
            <div className="login_links">
                <div className="login_link_ctr">Create an account</div>
                <div className="login_link_reg">Forgot your password?</div>
            </div>
        </BsForm>
  )
} 