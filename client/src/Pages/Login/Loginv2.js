import { Form as BsForm, Button, NavItem, NavLink } from "react-bootstrap";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { signIn } from "../../APIs/authAPI";
import { useAuth } from "../../Components/Authentication/authProvider";
import jwt_decode from "jwt-decode";

export async function logInUserV2({ request }) {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
    const token = await signIn(newData);
    return token
}

export default function Loginv2() {
    const { setToken } = useAuth()
    const token = useActionData()
    const navigate = useNavigate();

    if(token !== undefined) {
        const decoded = jwt_decode(token)
        setToken(token);
        if (decoded.role === "Seller") {
            navigate("/seller/dashboard")
        } else {
            navigate("/customer")
        }
    }

    return(
        // Email Field
        <BsForm as={Form} method='post' className="login_container">
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