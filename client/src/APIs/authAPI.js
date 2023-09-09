import axios from "axios"

// Register user
export async function register(newData) {
    try {
        var res = await axios.post('/register', newData)
        console.log(res.data.token)
    } catch (error) {
        alert(Object.values(error.response.data) + ".")
    }
}

// Log in user
export async function signIn(newData) {
    try {
        var res = await axios.post('/login', newData)
        localStorage.setItem('token', res.data.token);
        alert("User" + newData.email + " successfully Logged In")
        console.log(res.data.token)
    } catch (error) {
        alert(Object.values(error.response.data) + ".")
    }

}