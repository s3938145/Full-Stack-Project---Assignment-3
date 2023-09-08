import axios from "axios"

// Sign up user
export async function register(newData) {
    try {
        var res = await axios.post('/register', newData)
        alert("User " + newData.email + " successfully Registered")
        console.log(res.data)
    } catch (error) {
        alert(Object.values(error.response.data) + ".")
    }
}

// Log in user
export async function signIn(newData) {
    try {
        var res = await axios.post('/login', newData)
        alert("User" + newData.email + " successfully Logged In")
        console.log(res.data)
    } catch (error) {
        alert(Object.values(error.response.data) + ".")
    }

}