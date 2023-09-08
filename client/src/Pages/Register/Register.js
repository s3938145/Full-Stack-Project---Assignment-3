import { useState } from "react";
import { Form as BsForm, Button } from "react-bootstrap";
import { Form, redirect } from "react-router-dom";
import { register } from "../../APIs/authAPI";

import './register.css';

export async function registerUser({ request }) {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
    await register(newData);
    return redirect("/login")
}

export default function Register() {
    return (         
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

            <BsForm.Group className="login_input" controlId="role">
                <BsForm.Select name="role">
                    <option value="Seller">Seller</option>
                    <option value="Customer">Customer</option>
                </BsForm.Select>
            </BsForm.Group>

            <div className="login_input">
                <Button
                    className="login_button"
                    as="input"
                    type="submit"
                    value="Register"
                />
            </div>
            <div className="login_links">
                <div className="login_link_ctr">Create an account</div>
                <div className="login_link_reg">Forgot your password?</div>
            </div>
        </BsForm>
  )
}