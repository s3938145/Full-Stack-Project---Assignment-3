import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Components/Authentication/authProvider";

export function Logout() {
    const { clearToken } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        clearToken();
        navigate("/", { replace: true });
      };
    
      setTimeout(() => {
        handleLogout();
      }, 3);
    }