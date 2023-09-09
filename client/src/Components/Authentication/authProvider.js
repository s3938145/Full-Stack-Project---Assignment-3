import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// Empty context object
// Share authentication state and functions between components
const AuthContext = createContext()

// 'children' = child components that will have access to authentication context
const AuthProvider = ({ children }) => {
    const [token, setToken_ ] = useState(localStorage.getItem("token"))

    // Update authentication token
    const setToken = (newToken) => {
        setToken_(newToken);
    };

    // Set default authorization header in axios
    // Store token value in local storage
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer" + token;
            localStorage.setItem('token', token)
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    // Create memorized context value
    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token]
    );

    // Provide authentication context to child components 
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Export useAuth hook for accessing the authentication context
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;