import { Form as BsForm, Button, NavItem, NavLink } from "react-bootstrap";
import { Form, Link, redirect } from "react-router-dom";

import '../../index.css';
import { registerNewUser } from "../../APIs/authAPI";
import { useState } from "react";

export async function registerUser({ request }) {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
    await registerNewUser(newData);
    return redirect("/")
}

export default function Register() {
    const [role, setRole] = useState('Seller')

    function handleChange(event) {
        setRole(event.target.value)
    }

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

            {/* Phone Field */}
            <BsForm.Group className="login_input" controlId="phone">
                <BsForm.Control 
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                />
            </BsForm.Group>

            {/* Address Field */}


            {(role === "Seller") ? 

            <BsForm.Group className="login_input" controlId="businessName">
            <BsForm.Control 
                type="text"
                name="businessName"
                placeholder="Name of Business"
            />
            </BsForm.Group>

            :
            
            <BsForm.Group className="login_input" controlId="address">
            <BsForm.Control 
                type="text"
                name="address"
                placeholder="Address"
            />
            </BsForm.Group>
            }


            {/* Role Selector */}
            <BsForm.Group className="login_input" controlId="role">
                <BsForm.Select 
                name="role"
                onChange={handleChange}
                >
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
            <NavItem>
                <NavLink
                as={Link}
                to={'/login'}>
                    <div className="login_link_ctr">Sign in</div>
                </NavLink>
            </NavItem>
                <div className="login_link_reg">Forgot your password?</div>
            </div>
        </BsForm>
  )
}