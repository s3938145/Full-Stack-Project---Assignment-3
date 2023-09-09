import { Form as BsForm, Button, NavItem, NavLink } from "react-bootstrap";
import { signIn } from "../../APIs/authAPI";
import { redirect, Form, Link } from "react-router-dom";

import '../../index.css';
import { useAuth } from "../../Components/Authentication/authProvider";

export default function Login() {
    const { setToken } = useAuth()

    const handleLogin = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const newData = Object.fromEntries(formData.entries());

        await logInUser({ request: newData, setToken})
    }

    return (
        // Email Field
        <BsForm as={Form} method='post' className="login_container" onSubmit={handleLogin}>
            <div className="login_title">Log in</div>
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
                <NavItem>
                    <NavLink
                    as={Link}
                    to={'/register'}>
                        <div className="login_link_ctr">Create an account</div>
                    </NavLink>
                </NavItem>
                
                <div className="login_link_reg">Forgot your password?</div>
            </div>
        </BsForm>
  )
} 

export async function logInUser({ request, setToken }) {

    const token = await signIn(request);
    if (token) {
        setToken(token);
        return redirect('/');
    }
}